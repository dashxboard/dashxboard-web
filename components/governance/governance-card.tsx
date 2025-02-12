import Link from "next/link";
import { MessageCircle, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GovernanceFrontmatter } from "@/lib/markdown-config";
import { cn, timeFormats } from "@/lib/utils";

type TimelineEvent = {
  label: string;
  date?: string;
  isComplete?: boolean;
  isStatus?: boolean;
};

const TimelineItem = ({
  date,
  label,
  isLast = false,
  isComplete = false,
  isStatus = false,
}: {
  date?: string;
  label: string;
  isLast?: boolean;
  isComplete?: boolean;
  isStatus?: boolean;
}) => {
  if (!date) return null;

  const formattedDate = timeFormats(new Date(date)).dateOnly;
  const isPast = new Date(date) < new Date();

  return (
    <div className="relative flex gap-4 pb-4 pl-2">
      <div className="w-8 flex flex-col items-center">
        {!(isStatus && isComplete) && (
          <div
            className="w-[2px] absolute top-5 bg-muted-foreground/30 dark:bg-muted-foreground/40"
            style={{
              height: isLast ? "1rem" : "calc(100% - 0.5rem)",
            }}
          />
        )}
        <div
          className={cn(
            "w-3 h-3 rounded-full z-10 mt-1 ring-2 ring-background",
            isComplete
              ? "bg-primary"
              : isPast
              ? "bg-primary/50"
              : "bg-muted-foreground/30"
          )}
        />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{formattedDate}</p>
      </div>
    </div>
  );
};

export const GovernanceCard = ({
  id,
  title,
  description,
  date,
  status,
  result,
  snapshotTime,
  voteStart,
  voteEnd,
  resultsPublished,
  statusDate,
  link,
  discussion,
  slug,
}: GovernanceFrontmatter & { slug: string }) => {
  const dateObject = new Date(date);
  const at = timeFormats(dateObject);
  const isCompleted = status === "Completed";
  const now = new Date();

  const timelineEvents: TimelineEvent[] = [
    { label: "Posted", date },
    { label: "Snapshot", date: snapshotTime },
    { label: "Voting Starts", date: voteStart },
    { label: "Voting Ends", date: voteEnd },
    { label: "Results Published", date: resultsPublished },
  ].filter((event) => event.date) as TimelineEvent[];

  if (statusDate) {
    timelineEvents.push({
      label: `${status}`,
      date: statusDate,
      isComplete: isCompleted,
      isStatus: true,
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          className={cn(
            "flex flex-col h-full transition-all duration-300 cursor-pointer",
            isCompleted
              ? "border-primary/30 hover:border-primary/60 dark:border-primary/30 dark:hover:border-primary/50"
              : "hover:border-muted-foreground/30 border-border"
          )}
        >
          <CardHeader>
            <h3 className="text-md font-semibold pr-7">
              <span className="text-muted-foreground">{id}</span>
              <span className="mx-2">-</span>
              {title}
            </h3>
            <div className="w-full border-t border-border/80 my-2" />
            <p className="text-sm text-muted-foreground">{description}</p>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 mt-auto pt-0">
            <p className="text-[13px] text-muted-foreground">
              Posted on <time dateTime={at.iso}>{at.dateOnly}</time>
            </p>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-[95vw] sm:max-w-3xl px-4 sm:px-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            <span className="text-muted-foreground">{id}</span>
            <span className="mx-2">-</span>
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {result && (
            <div className="border rounded-lg p-4 bg-accent/30 dark:bg-accent/20 border-border">
              <div className="text-base font-semibold text-primary mb-2">
                Results
              </div>
              <div className="text-sm font-medium text-foreground/80">
                {result}
              </div>
            </div>
          )}

          <div className="ml-2 sm:ml-4">
            {timelineEvents.map((event, index) => (
              <TimelineItem
                key={`${event.label}-${index}`}
                date={event.date}
                label={event.label}
                isLast={index === timelineEvents.length - 1}
                isComplete={event.isComplete ?? new Date(event.date!) < now}
                isStatus={event.isStatus}
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4 border-t">
            {link && (
              <Link
                href={link}
                className="flex items-center gap-2 text-sm text-primary underline underline-offset-4 hover:text-primary/80"
                target="_blank"
              >
                View Details
                <ExternalLink className="h-4 w-4" />
              </Link>
            )}
            {discussion && (
              <Link
                href={discussion}
                className="flex items-center gap-2 text-sm text-primary underline underline-offset-4 hover:text-primary/80"
                target="_blank"
              >
                Join the Discussion
                <MessageCircle className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
