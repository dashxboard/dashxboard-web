import { Balancer } from "react-wrap-balancer";
import { db, sql } from "@dashxboard/db";
import { FrownIcon } from "lucide-react";
import { ProposalFilter } from "@/components/proposal/proposal-filter";

const getProposals = async () => {
  return await db
    .selectFrom("posts")
    .innerJoin("users", "users.snowflake", "posts.user")
    .leftJoin("messages as conclusion", "conclusion.snowflake", "posts.status")
    .leftJoin("messages", "messages.snowflake", "posts.snowflake")
    .select([
      "posts.id",
      "posts.snowflake",
      "posts.title",
      "posts.category",
      "posts.created",
      "users.username",
      "users.avatar as userAvatar",
      "messages.content as description",
      sql<boolean>`conclusion.id is not null`.as("isConcluded"),
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
    .execute();
};

export const ProposalList = async () => {
  const proposals = await getProposals();

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

  return (
    <>
      <ProposalFilter proposals={proposals} />
    </>
  );
};
