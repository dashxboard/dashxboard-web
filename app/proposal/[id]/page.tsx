import "@/styles/discord.css";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { QAPage, WithContext } from "schema-dts";
import plur from "plur";
import { ArrowLeftIcon, CircleCheck, ExternalLink } from "lucide-react";
import { db, sql } from "@dashxboard/db";
import { getProposalURL, groupMessages, timeAgo, truncate } from "@/lib/utils";
import { parseMessage } from "@/lib/markdown";
import { Message } from "@/components/message/message";
import { Conclusion } from "@/components/message/conclusion";
import { Attachment, Content } from "@/components/message/content";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShareButton } from "@/components/share";
import { Progress } from "@/components/progess";

const getIndexed = async (id: string) => {
  try {
    const proposal = await db
      .selectFrom("posts")
      .select("indexed")
      .where("title", "like", `${id}%`)
      .executeTakeFirst();

    return proposal ? proposal.indexed : false;
  } catch (error) {
    console.error("Database error:", error);
    return false;
  }
};

const getProposal = async (id: string) => {
  return await db
    .selectFrom("posts")
    .innerJoin("users", "users.snowflake", "posts.user")
    .innerJoin("channels", "channels.snowflake", "posts.channel")
    .leftJoin("messages", "messages.snowflake", "posts.status")
    .select([
      "posts.id",
      "posts.snowflake",
      "posts.title",
      "posts.created",
      "posts.category",
      "posts.status",
      "users.username",
      "users.snowflake as userID",
      "users.public as isPublic",
      "users.avatar as userAvatar",
      "channels.name as channelName",
      sql<boolean>`messages.id is not null`.as("isConcluded"),
      (eb) =>
        eb
          .selectFrom("messages")
          .select(eb.fn.countAll<number>().as("count"))
          .where("messages.post", "=", eb.ref("posts.snowflake"))
          .as("messagesCount"),
      (eb) =>
        eb
          .selectFrom("messages")
          .select(sql<string>`count(distinct messages.user)`.as("count"))
          .where("messages.post", "=", eb.ref("posts.snowflake"))
          .as("participantsCount"),
    ])
    .where("posts.title", "like", `${id}%`)
    .executeTakeFirst();
};

const getMessage = async (proposal: any) => {
  if (!proposal) return null;

  return await db
    .selectFrom("messages")
    .leftJoin("attachments", "attachments.message", "messages.snowflake")
    .innerJoin("users", "users.snowflake", "messages.user")
    .select([
      "messages.id",
      "messages.content",
      "messages.created",
      "users.id as author",
      "users.avatar as authorAvatar",
      "users.username as authorUsername",
      "users.public as isPublic",
      "users.moderator as isModerator",
      "users.snowflake as userID",
      "users.reputation as userReputation",
      sql<Attachment[]>`
        coalesce(json_agg(
          json_build_object(
            'id', attachments.id,
            'url', attachments.url,
            'name', attachments.name,
            'content', attachments.content
          )
        ) filter (where attachments.id is not null), '[]'::json)
      `.as("attachments"),
    ])
    .where("messages.post", "=", proposal.snowflake)
    .where("messages.snowflake", "=", proposal.snowflake)
    .groupBy(["messages.id", "users.id"])
    .orderBy("messages.created", "asc")
    .executeTakeFirst();
};

const getMessages = async (proposal: any) => {
  if (!proposal) return [];

  return await db
    .selectFrom("messages")
    .leftJoin("attachments", "attachments.message", "messages.snowflake")
    .innerJoin("users", "users.snowflake", "messages.user")
    .select([
      "messages.id",
      "messages.snowflake",
      "messages.content",
      "messages.created",
      "users.id as author",
      "users.avatar as authorAvatar",
      "users.username as authorUsername",
      "users.public as isPublic",
      "users.moderator as isModerator",
      "users.snowflake as userID",
      "users.reputation as userReputation",
      sql<Attachment[]>`
          coalesce(json_agg(
            json_build_object(
              'id', attachments.id,
              'url', attachments.url,
              'name', attachments.name,
              'content', attachments.content
            )
          ) filter (where attachments.id is not null), '[]'::json)
        `.as("attachments"),
    ])
    .where("post", "=", proposal.snowflake)
    .where("messages.snowflake", "!=", proposal.snowflake)
    .groupBy(["messages.id", "users.id"])
    .orderBy("messages.created", "asc")
    .execute();
};

export const dynamic = "error";
export const revalidate = 60;

type ProposalParams = Promise<{ id: string }>;

type ProposalProps = {
  params: ProposalParams;
};

export const generateMetadata = async (
  props: ProposalProps
): Promise<Metadata> => {
  const params = await props.params;
  const { id } = params;
  const decodedTitle = decodeURIComponent(id);
  const proposal = await getProposal(decodedTitle);
  const posted = await getMessage(proposal);
  const url = getProposalURL(decodedTitle);

  return {
    title: `${decodedTitle}`,
    description: truncate(await parseMessage(posted?.content || "", true), 230),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${decodedTitle} | Dashxboard`,
      description: truncate(
        await parseMessage(posted?.content || "", true),
        230
      ),
      url,
      type: "article",
      siteName: "Dashxboard",
    },
    twitter: {
      card: "summary",
      title: `${decodedTitle} | Dashxboard`,
      description: truncate(
        await parseMessage(posted?.content || "", true),
        230
      ),
    },
  };
};

const Proposal = async (props: ProposalProps) => {
  const params = await props.params;
  const { id } = params;

  const isIndexed = await getIndexed(id);
  if (!isIndexed) {
    notFound();
  }

  const proposal = await getProposal(id);
  if (!proposal) {
    notFound();
  }

  const messages = await getMessages(proposal);
  const posted = await getMessage(proposal);
  const conclusion = messages.find((m) => m.snowflake === proposal.status);
  const grouped = groupMessages(messages, proposal.status);
  const hasStatus =
    proposal.status && messages.some((m) => m.snowflake === proposal.status);
  const truncated = truncate(proposal.username, 32);

  const json: WithContext<QAPage> = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: proposal.title,
      text: posted
        ? await parseMessage(posted?.content, true)
        : "Original message was deleted. The proposal will be unindexed soon.",
      dateCreated: proposal.created.toJSON(),
      answerCount: messages.length,
      author: {
        "@type": "Person",
        name: proposal.username,
      },
      acceptedAnswer:
        hasStatus && conclusion
          ? {
              "@type": "Answer",
              text: await parseMessage(conclusion.content, true),
              url: `${getProposalURL(id)}#message-${conclusion.snowflake}`,
              dateCreated: conclusion.created.toJSON(),
              author: {
                "@type": "Person",
                name: conclusion.authorUsername,
              },
              upvoteCount: 1,
            }
          : undefined,
      suggestedAnswer:
        !hasStatus && messages[0]
          ? {
              "@type": "Answer",
              text: await parseMessage(messages[0].content, true),
              url: `${getProposalURL(id)}#message-${messages[0].snowflake}`,
              dateCreated: messages[0].created.toJSON(),
              author: {
                "@type": "Person",
                name: messages[0].authorUsername,
              },
            }
          : undefined,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
      />
      <Progress />
      <div>
        <Button variant="link" asChild className="!mx-0 !px-0 mb-7 !-ml-1 mt-7">
          <Link href="/">
            <ArrowLeftIcon className="w-4 h-4 mr-1.5" /> Back to proposals
          </Link>
        </Button>
        <h1 className="mb-4 font-semibold text-3xl">{proposal.title}</h1>
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {proposal.isConcluded ? (
              <Badge variant="default">Concluded</Badge>
            ) : (
              <Badge variant="secondary">Open</Badge>
            )}
            {proposal.category && (
              <Badge variant="secondary">
                {proposal.category.charAt(0).toUpperCase() +
                  proposal.category.slice(1)}
              </Badge>
            )}
            <div>
              {truncated}{" "}
              <span className="opacity-50">
                posted in{" "}
                <span className="font-semibold">#{proposal.channelName}</span> ·{" "}
                last active{" "}
                <time
                  dateTime={
                    messages[messages.length - 1]?.created.toISOString() ||
                    proposal.created.toISOString()
                  }
                >
                  {timeAgo(
                    messages[messages.length - 1]?.created || proposal.created
                  )}
                </time>
              </span>
            </div>
          </div>
          <div className="flex w-full sm:w-auto items-center gap-2">
            <div className="flex-1 sm:flex-initial w-full">
              <ShareButton className="w-full" />
            </div>
            <Button
              variant="outline"
              effect="expandIcon"
              icon={ExternalLink}
              iconPlacement="right"
              asChild
              className="flex-1 sm:flex-initial w-full"
            >
              <Link
                href={`https://discord.com/channels/1271465994384310387/${proposal.snowflake}/${proposal.snowflake}`}
                className="flex items-center justify-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Discord
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-1">
        <Conclusion isConcluded={false}>
          {posted ? (
            <Message
              snowflake={posted.id.toString()}
              created={posted.created}
              content={posted.content}
              author={{
                username: posted.authorUsername,
                avatar: posted.authorAvatar,
                public: posted.isPublic,
                op: true,
                moderator: posted.isModerator,
                id: posted.userID,
                reputation: posted.userReputation,
              }}
              attachments={posted.attachments}
              firstRow
            />
          ) : (
            <span className="px-4 opacity-80">
              Original message was deleted. The proposal will be unindexed soon.
            </span>
          )}
        </Conclusion>
        {conclusion && (
          <div className="w-full p-4 space-y-2 border rounded-md border-[#5865F2]/30 dark:border-[#7289DA]/30 bg-[#5865F2]/5 dark:bg-[#7289DA]/5">
            <div className="flex gap-2 items-center text-[#5865F2] dark:text-[#7289DA]">
              <CircleCheck className="w-4 h-4 shrink-0" />
              <span className="text-sm font-medium">
                This proposal has been marked as concluded.
              </span>
            </div>
            <div
              className="max-h-32 overflow-hidden"
              style={{
                WebkitMaskImage:
                  "linear-gradient(180deg, #000 80%, transparent)",
                maskImage: "linear-gradient(180deg, #000 80%, transparent)",
              }}
            >
              <Content
                content={conclusion.content}
                attachments={conclusion.attachments}
              />
            </div>
            <Button
              variant="link"
              asChild
              className="p-0 h-auto text-sm underline underline-offset-4 hover:text-muted-foreground font-normal"
            >
              <a href={`#message-${conclusion.snowflake}`}>View conclusion</a>
            </Button>
          </div>
        )}
      </div>
      <h2 className="my-4 text-lg font-semibold">
        {messages.length} {plur("Reply", messages.length)} ·{" "}
        {parseInt(proposal.participantsCount ?? "0", 10)}{" "}
        {plur("Participant", parseInt(proposal.participantsCount ?? "0", 10))}
      </h2>
      <div className="space-y-2">
        {grouped.map((group) => (
          <Conclusion
            key={group.id}
            isConcluded={group.messages.some(
              (m) => m.snowflake === proposal.status
            )}
          >
            {group.messages.map((message, i) => (
              <Message
                key={message.id.toString()}
                snowflake={message.snowflake}
                created={message.created}
                content={message.content}
                firstRow={i === 0}
                author={{
                  username: message.authorUsername,
                  avatar: message.authorAvatar,
                  public: message.isPublic,
                  op: posted ? message.author === posted.author : false,
                  moderator: message.isModerator,
                  id: message.id,
                  reputation: message.userReputation,
                }}
                attachments={message.attachments}
              />
            ))}
          </Conclusion>
        ))}
      </div>
    </>
  );
};

export default Proposal;
