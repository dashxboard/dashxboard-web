import Link from "next/link";
import plur from "plur";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, timeFormats } from "@/lib/utils";

type ProposalProps = {
  id: string;
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

export const Proposal = ({
  id,
  title,
  messagesCount,
  participantsCount,
  created,
  category,
  isConcluded,
  author,
}: ProposalProps) => {
  const at = timeFormats(created);

  return (
    <Link href={`/proposal/${id}`} className="block no-underline">
      <Card
        className={cn(
          "flex flex-col h-full transition-all duration-300 ease-in-out",
          isConcluded
            ? "border-blue-500/20 dark:border-blue-400/30 bg-blue-50/50 dark:bg-blue-950/20 hover:border-blue-500/40 dark:hover:border-blue-400/50"
            : "hover:border-neutral-500/40 dark:hover:border-white/20"
        )}
      >
        <CardHeader>
          <h3 className="text-md font-semibold pr-7">{title}</h3>
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
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-muted-foreground">
                by {author.username}
              </p>
              <div className="flex gap-2">
                {category && (
                  <Badge variant="secondary">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Badge>
                )}
                <Badge variant={isConcluded ? "default" : "secondary"}>
                  {isConcluded ? "Concluded" : "Open"}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
