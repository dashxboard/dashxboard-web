import { EyeOff, Shield } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import {
  MessageAttachment,
  MessageContent,
} from "@/components/message/message-content";
import { DisplayTime } from "@/components/ui/time";
import { timeFormats } from "@/lib/utils";
import "highlight.js/styles/github-dark-dimmed.css";

type MessageProps = {
  snowflake: string;
  content: string;
  firstRow: boolean;
  author: {
    username: string;
    avatar: string;
    public: boolean;
    op: boolean;
    moderator: boolean;
    id: string;
    reputation: number;
  };
  created: Date;
  attachments: MessageAttachment[];
};

export const Message = ({
  snowflake,
  content,
  firstRow,
  author,
  created,
  attachments,
}: MessageProps) => {
  const at = timeFormats(created);

  return (
    <div id={`message-${snowflake}`} className="group">
      <div className="flex flex-row items-start gap-4 pointer-events-none [&>*]:pointer-events-auto">
        {firstRow ? (
          <img
            src={author.avatar}
            alt="Avatar"
            className="w-10 h-10 rounded-full border border-border"
          />
        ) : (
          <div className="w-10 h-10 flex items-center justify-center">
            <time
              className="hidden group-hover:block text-xs text-muted-foreground/80"
              dateTime={at.iso}
            >
              <DisplayTime short dateString={created.toISOString()} />
            </time>
          </div>
        )}
        <div className="flex-1 w-0">
          {firstRow && (
            <div className="mb-1">
              <div className="flex flex-row items-center gap-x-2 gap-y-1 flex-wrap">
                <span className="text-foreground">{author.username}</span>
                <div className="flex items-center gap-2">
                  {!author.public && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Non-public user information</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {author.moderator && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Shield className="w-4 h-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Moderator</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {author.op && <Badge variant="secondary">OP</Badge>}
                  <Badge variant="outline" className="border-border">
                    {author.reputation}
                  </Badge>
                </div>
                <time
                  className="text-xs text-muted-foreground basis-full md:basis-auto"
                  dateTime={at.iso}
                >
                  <DisplayTime dateString={created.toISOString()} />
                </time>
              </div>
            </div>
          )}
          <MessageContent content={content} attachments={attachments} />
        </div>
      </div>
    </div>
  );
};
