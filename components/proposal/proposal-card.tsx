import Link from "next/link";
import plur from "plur";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn, timeFormats, truncate } from "@/lib/utils";

type ProposalProps = {
  title: string;
  description: string | null;
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

export const ProposalCard = ({
  title,
  description,
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
          "flex flex-col h-full transition-colors duration-300",
          isConcluded
            ? "border-primary/30 hover:border-primary/60 dark:border-primary/30 dark:hover:border-primary/50"
            : "hover:border-muted-foreground/30 border-border"
        )}
      >
        <CardHeader>
          <h3 className="text-md font-semibold pr-7">
            <span className="text-muted-foreground">{ID}</span>
            {ID && " - "}
            {Title}
          </h3>
          <div className="w-full border-t border-border/80 my-2" />
          <p className="text-[13px] text-muted-foreground">
            {messagesCount} {plur("Message", messagesCount)} ·{" "}
            {participantsCount} {plur("Participant", participantsCount)}
          </p>
          <p className="text-sm text-foreground/90">
            {truncate(description ? description : "", 100)}
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
