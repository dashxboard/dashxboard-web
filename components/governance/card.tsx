import Link from "next/link";
import { ExternalLink, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GovernanceCard as GovernanceCardType } from "@/lib/proposals";
import { cn, timeFormats } from "@/lib/utils";

export const GovernanceCard = ({
  id,
  title,
  description,
  date,
  status,
  link,
  discussion,
}: GovernanceCardType) => {
  const at = timeFormats(date);
  const isCompleted = status === "Completed";

  return (
    <Card
      className={cn(
        "flex flex-col h-full transition-all duration-500 ease-in-out",
        isCompleted
          ? "border-[#5865F2]/30 dark:border-[#7289DA]/30 bg-[#5865F2]/5 dark:bg-[#7289DA]/5 hover:border-blue-500/50 dark:hover:border-blue-400/50"
          : "hover:border-neutral-500/50 dark:hover:border-white/30"
      )}
    >
      <CardHeader>
        <h3 className="text-md font-semibold pr-7">
          <span className="text-muted-foreground">{id}</span>
          <span className="mx-2">-</span>
          {title}
        </h3>
        <div className="w-full border-t my-2 opacity-80" />
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 mt-auto pt-0">
        <p className="text-[13px] text-muted-foreground">
          Posted on <time dateTime={at.iso}>{at.dateOnly}</time>
        </p>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {link && (
              <Link
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline underline-offset-4 hover:text-muted-foreground inline-flex items-center"
              >
                View Details
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            )}
            {discussion && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      asChild
                    >
                      <Link href={discussion}>
                        <MessageCircle className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Join the discussion</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
