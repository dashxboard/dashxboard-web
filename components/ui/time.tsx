"use client";

import { timeFormats } from "@/lib/utils";

export const DisplayTime = ({
  short,
  dateString,
}: {
  short?: boolean;
  dateString: string;
}) => {
  const time = timeFormats(new Date(dateString));
  return (
    <span className="visible">{short ? time.shortTime : time.longTime}</span>
  );
};
