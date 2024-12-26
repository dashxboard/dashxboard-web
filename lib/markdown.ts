import { cache } from "react";
import { toHTML } from "discord-markdown";
import { sanitizeText } from "simple-markdown";
import { load } from "cheerio";
import { db } from "@dashxboard/db";
import { getProposalURL } from "./utils";

interface UserCache {
  snowflake: string;
  username: string;
}

interface ChannelCache {
  snowflake: string;
  name: string;
}

interface PostCache {
  snowflake: string;
  title: string;
}

const fetchUser = cache((userID: string) => {
  return db
    .selectFrom("users")
    .select(["snowflake", "username"])
    .where("snowflake", "=", userID)
    .executeTakeFirst();
});

const fetchChannel = cache((channelID: string) => {
  return db
    .selectFrom("channels")
    .select(["snowflake", "name"])
    .where("snowflake", "=", channelID)
    .executeTakeFirst();
});

const fetchPost = cache((postID: string) => {
  return db
    .selectFrom("posts")
    .select(["snowflake", "title"])
    .where("snowflake", "=", postID)
    .executeTakeFirst();
});

const userMention = /<@!?(?<user>\d+)>/g;
const channelLink =
  /https:\/\/discord\.com\/channels\/(?<guild>\d+)\/(?<channel>\d+)(\/(?<message>\d+))?/g;
const channelMention = /<#(?<channel>\d+)>/g;

export const extractMentions = cache((content: string) => {
  const userIDs = new Set<string>(
    Array.from(
      content.matchAll(userMention),
      (mention) => mention.groups?.user ?? ""
    )
  );

  const channelIDs = new Set<string>(
    Array.from(
      content.matchAll(channelMention),
      (mention) => mention.groups?.channel ?? ""
    )
  );

  const postIDs = new Set<string>(
    Array.from(
      content.matchAll(channelLink),
      (mention) => mention.groups?.channel ?? ""
    )
  );
  return { userIDs, channelIDs, postIDs };
});

export const fetchMentions = async (content: string) => {
  const { userIDs, channelIDs, postIDs } = extractMentions(content);

  const [users, posts, channels] = await Promise.all([
    Promise.all(Array.from(userIDs).map(fetchUser)),
    Promise.all(Array.from(channelIDs).map(fetchChannel)),
    Promise.all(Array.from(postIDs).map(fetchPost)),
  ]);
  return { users, posts, channels };
};

export const parseMessage = async (content: string, justText = false) => {
  const { users, channels, posts } = await fetchMentions(content);

  content = content.replace(channelLink, (match, channelId, _, messageId) => {
    const post = posts.find((p) => p?.snowflake === channelId);

    if (!post) return match;

    return `${getProposalURL(post.snowflake)}${
      messageId ? `#message-${messageId}` : ""
    }`;
  });

  const html = toHTML(content, {
    discordCallback: {
      user: (node) => {
        const user = users.find((u) => u?.snowflake === node.id);
        if (!user) return `<i>@Unknown User</i>`;

        const userName = sanitizeText(user.username);
        return `@${userName}`;
      },
      channel: (node) => {
        const channel = channels.find((c) => c?.snowflake === node.id);
        let channelName = channel && sanitizeText(channel.title);

        if (!channelName) {
          const post = posts.find((p) => p?.snowflake === node.id);
          if (!post) return `<i>#Unknown Channel</i>`;
          channelName = post.name;
        }
        return `#${channelName}`;
      },
    },
  });

  const $ = load(html);

  $("a")
    .attr("target", "_blank")
    .attr("rel", "noopener nofollow ugc")
    .addClass("d-link");

  $("pre:has(code)").addClass("d-code-block");

  $("code:not(pre *)").addClass("d-code-inline");

  $("blockquote").addClass("d-quote");

  if (justText) {
    return $("body").text() ?? "";
  }

  return $("body").html() ?? "";
};
