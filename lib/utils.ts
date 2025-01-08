import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DateTime } from "@/lib/luxon";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const timeFormats = (created: Date) => {
  const datetime = DateTime.fromJSDate(created).setZone("UTC");

  const longTime = datetime.setLocale("en-US").toLocaleString({
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
  });

  const shortTime = datetime.toLocaleString({
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
  });

  const dateOnly = datetime.setLocale("en-US").toLocaleString({
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

  const iso = datetime.toUTC().toISO();

  return { longTime, shortTime, dateOnly, iso };
};

export const largerDate = (...dates: Date[]) => {
  return dates.reduce((a, b) => (a > b ? a : b));
};

export const timeAgo = (date: Date) => {
  const datetime = DateTime.fromJSDate(date).setZone("UTC");
  const now = DateTime.now().setZone("UTC");

  const diff = now.diff(datetime, [
    "years",
    "months",
    "days",
    "hours",
    "minutes",
  ]);

  if (diff.years > 0) {
    return `${Math.floor(diff.years)} year${diff.years === 1 ? "" : "s"} ago`;
  }
  if (diff.months > 0) {
    return `${Math.floor(diff.months)} month${
      diff.months === 1 ? "" : "s"
    } ago`;
  }
  if (diff.days > 0) {
    return `${Math.floor(diff.days)} day${diff.days === 1 ? "" : "s"} ago`;
  }
  if (diff.hours > 0) {
    return `${Math.floor(diff.hours)} hour${diff.hours === 1 ? "" : "s"} ago`;
  }
  if (diff.minutes > 0) {
    return `${Math.floor(diff.minutes)} minute${
      diff.minutes === 1 ? "" : "s"
    } ago`;
  }

  return "just now";
};

import { randomUUID } from "crypto";

type RequiredMessageFields = {
  id: string;
  snowflake: string;
  author: string;
  created: Date;
};

type GroupedMessages<T> = Array<{
  id: string;
  messages: T[];
}>;

export const groupMessages = <T extends RequiredMessageFields>(
  messages: T[],
  status: string | null = null
) => {
  return messages.reduce<GroupedMessages<T>>((acc, message) => {
    const lastGroup = acc[acc.length - 1];

    if (!lastGroup) {
      return [{ id: randomUUID(), messages: [message] }];
    }

    const addToNewGroup = () => {
      acc.push({ id: randomUUID(), messages: [message] });
      return acc;
    };
    const lastMessage = lastGroup.messages.at(-1);
    if (!lastMessage || lastMessage.author !== message.author) {
      return addToNewGroup();
    }

    const secondsFromLastMessage =
      (message.created.getTime() - lastMessage.created.getTime()) / 1000;

    if (secondsFromLastMessage > 60 * 5) {
      return addToNewGroup();
    }

    if (
      status &&
      (message.snowflake === status || lastMessage.snowflake === status)
    ) {
      return addToNewGroup();
    }

    lastGroup.messages.push(message);
    return acc;
  }, []);
};

export const truncate = (str: string, length: number) => {
  return str.length > length ? str.substring(0, length) + "_" : str;
};

export const getBaseURL = () => {
  return process.env.BASE_URL ?? "http://localhost:3000";
};

export const getProposalURL = (title: string) => {
  const baseUrl = getBaseURL();
  if (title) {
    const parts = title.split("-");
    if (parts.length >= 2) {
      const proposalID = parts[0] + "-" + parts[1].split(" ")[0];
      return `${baseUrl}/proposal/${proposalID}`;
    }
  }
  console.error("Invalid proposal title:", title);
  return baseUrl;
};

export const isVideo = (link: string): boolean => {
  const extensions = [".mp4", ".avi", ".flv", ".wmv"];
  return extensions.some((extension) => link.endsWith(extension));
};
