import { Balancer } from "react-wrap-balancer";
import { db, sql } from "@dashxboard/db";
import { FrownIcon } from "lucide-react";
import { Filter } from "@/components/proposal/filter";
import { ScrollUp } from "@/components/scrollup";

const getProposals = async () => {
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
    .execute();
};

export const List = async () => {
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
      <Filter proposals={proposals} />
      <ScrollUp />
    </>
  );
};
