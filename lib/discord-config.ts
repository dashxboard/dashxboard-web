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

const ROLES: Record<string, string> = {
  "1320609298409197648": "Contributor",
  "1320607267598631012": "Moderator",
  "1320606796997722183": "Administrator",
};

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
const roleMention = /<@&(?<role>\d+)>/g;
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

  const roleIDs = new Set<string>(
    Array.from(
      content.matchAll(roleMention),
      (mention) => mention.groups?.role ?? ""
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

  return { userIDs, roleIDs, channelIDs, postIDs };
});

export const fetchMentions = async (content: string) => {
  const { userIDs, roleIDs, channelIDs, postIDs } = extractMentions(content);

  const [users, channels, posts] = await Promise.all([
    Promise.all(Array.from(userIDs).map(fetchUser)),
    Promise.all(Array.from(channelIDs).map(fetchChannel)),
    Promise.all(Array.from(postIDs).map(fetchPost)),
  ]);

  return { users, channels, posts, roleIDs };
};

export const parseMessage = async (content: string, justText = false) => {
  const { users, channels, posts, roleIDs } = await fetchMentions(content);

  content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    const encodedUrl = encodeURI(url);
    return `[${sanitizeText(text)}](${encodedUrl})`;
  });

  content = content.replace(channelLink, (match, channelId, _, messageId) => {
    const post = posts.find((p) => p?.snowflake === channelId);
    return post
      ? `${getProposalURL(post.snowflake)}${
          messageId ? `#message-${messageId}` : ""
        }`
      : match;
  });

  const html = toHTML(content, {
    discordCallback: {
      user: (node) => {
        const user = users.find((u) => u?.snowflake === node.id);
        return user
          ? `@${sanitizeText(user.username)}`
          : `<i>@Unknown User</i>`;
      },
      channel: (node) => {
        const channel = channels.find((c) => c?.snowflake === node.id);
        const post = posts.find((p) => p?.snowflake === node.id);
        const channelName = channel?.name || post?.title || "Unknown Channel";
        return `#${sanitizeText(channelName)}`;
      },
      role: (node) => {
        const roleName = ROLES[node.id] || "Unknown Role";
        return `<span class="d-mention" data-role-id="${node.id}">@${roleName}</span>`;
      },
    },
    escapeHTML: false,
    embed: true,
  });

  const $ = load(html);

  $("a").each((_, element) => {
    const $el = $(element);
    if (!$el.attr("href")) return;

    $el.addClass("d-link");
    $el.attr({
      target: "_blank",
      rel: "noopener nofollow ugc",
    });

    $el.css({
      "text-decoration": "underline",
      "text-decoration-thickness": "1px",
      "text-underline-offset": "0.25em",
    });
  });

  $("pre:has(code)").addClass("d-code-block");
  $("code:not(pre *)").addClass("d-code-inline");
  $("blockquote").addClass("d-quote");

  return justText ? $("body").text() || "" : $("body").html() || "";
};
