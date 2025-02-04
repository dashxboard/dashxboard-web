import Link from "next/link";
import plur from "plur";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn, timeFormats } from "@/lib/utils";

type ProposalProps = {
  title: string;
  messagesCount: number;
  participantsCount: number;
  created: Date;
  category: string | null;
  isConcluded: boolean;
  author: {
    username: string;
  };
};

const splitTitle = (title: string) => {
  const match = title.match(/^([A-Z]+-\d+)\s*-\s*(.+)$/);
  if (match) {
    return {
      id: match[1],
      rest: match[2],
    };
  }
  return {
    id: "",
    rest: title,
  };
};

export const Proposal = ({
  title,
  messagesCount,
  participantsCount,
  created,
  category,
  isConcluded,
  author,
}: ProposalProps) => {
  const at = timeFormats(created);
  const { id: ID, rest: Title } = splitTitle(title);

  return (
    <Link
      href={`/proposal/${title.split("-")[0]}-${
        title.split("-")[1].split(" ")[0]
      }`}
      className="block no-underline"
    >
      <Card
        className={cn(
          "flex flex-col h-full transition-all duration-500 ease-in-out",
          isConcluded
            ? "border-[#5865F2]/30 dark:border-[#7289DA]/30 bg-[#5865F2]/5 dark:bg-[#7289DA]/5 hover:border-blue-500/50 dark:hover:border-blue-400/50"
            : "hover:border-neutral-500/50 dark:hover:border-white/30"
        )}
      >
        <CardHeader>
          <h3 className="text-md font-semibold pr-7">
            <span className="text-muted-foreground">{ID}</span>
            {ID && " - "}
            {Title}
          </h3>
          <div className="w-full border-t my-2 opacity-80" />
          <p className="text-sm text-muted-foreground">
            {messagesCount} {plur("Message", messagesCount)} ·{" "}
            {participantsCount} {plur("Participant", participantsCount)}
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 mt-auto pt-0">
          <div className="flex flex-col gap-1">
            <p className="text-[13px] text-muted-foreground">
              Proposed on <time dateTime={at.iso}>{at.longTime}</time>
            </p>
            <p className="text-[13px] text-muted-foreground">
              by {author.username}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
