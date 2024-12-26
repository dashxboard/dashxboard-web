import { Balancer } from "react-wrap-balancer";
import { db, sql } from "@dashxboard/db";
import { FrownIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Proposal } from "@/components/proposal/proposal";
import { ScrollUp } from "@/components/scrollup";

const PROPOSALS_BY_PAGE = 20;

const getProposals = async (page: number) => {
  const limit = PROPOSALS_BY_PAGE;
  const offset = (page - 1) * limit;

  return await db
    .selectFrom("posts")
    .innerJoin("users", "users.snowflake", "posts.user")
    .leftJoin("messages", "messages.snowflake", "posts.status")
    .select([
      "posts.id",
      "posts.snowflake",
      "posts.title",
      "posts.category",
      "posts.created",
      "users.username",
      "users.avatar as userAvatar",
      sql<boolean>`messages.id is not null`.as("isConcluded"),
      (eb) =>
        eb
          .selectFrom("messages")
          .select(eb.fn.countAll<string>().as("count"))
          .where("messages.post", "=", eb.ref("posts.snowflake"))
          .where("messages.snowflake", "!=", eb.ref("posts.snowflake"))
          .as("messagesCount"),
      (eb) =>
        eb
          .selectFrom("messages")
          .select(sql<string>`count(distinct messages.user)`.as("count"))
          .where("messages.post", "=", eb.ref("posts.snowflake"))
          .as("participantsCount"),
    ])
    .where("indexed", "=", true)
    .orderBy("created", "desc")
    .limit(limit + 1)
    .offset(offset)
    .execute();
};

type ListProps = {
  page: number;
};

export const List = async ({ page }: ListProps) => {
  const proposals = await getProposals(page);

  if (proposals.length === 0) {
    return (
      <>
        <div className="flex flex-col space-y-2 items-center justify-center min-h-[50vh]">
          <FrownIcon size={48} className="opacity-75" />
          <div className="text-xl text-center w-full opacity-80">
            <Balancer>
              Currently, no proposals have been indexed. Feel free to check back
              later, or better yet, become part of the Discord community and
              share your ideas for future proposals!
            </Balancer>
          </div>
        </div>
      </>
    );
  }

  const hasNext = proposals.length > PROPOSALS_BY_PAGE;
  const toRender = proposals.slice(0, PROPOSALS_BY_PAGE);
  const hasPrevious = page > 1;

  return (
    <>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-8 gap-4 mb-5">
        {toRender.map((proposal) => (
          <Proposal
            key={proposal.id.toString()}
            id={proposal.snowflake}
            title={proposal.title}
            messagesCount={parseInt(proposal.messagesCount ?? "0", 10)}
            participantsCount={parseInt(proposal.participantsCount ?? "0", 10)}
            created={proposal.created}
            category={proposal.category}
            isConcluded={proposal.isConcluded}
            author={{
              username: proposal.username,
            }}
          />
        ))}
      </div>
      <div className="mt-4 flex space-x-4 justify-center">
        {(hasPrevious || hasNext) && (
          <Pagination className="mt-4">
            <PaginationContent>
              {hasPrevious && (
                <PaginationItem>
                  <PaginationPrevious href={`/page/${page - 1}`} />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationLink href={`/page/${page}`} isActive>
                  {page}
                </PaginationLink>
              </PaginationItem>

              {hasNext && (
                <PaginationItem>
                  <PaginationNext href={`/page/${page + 1}`} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </div>
      <ScrollUp />
    </>
  );
};
