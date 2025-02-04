import { EyeOff, Shield } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Attachment, Content } from "@/components/message/content";
import { ScrollUp } from "@/components/scrollup";
import { DisplayTime } from "@/components/time";
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
  attachments: Attachment[];
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
    <>
      <div id={`message-${snowflake}`} className="group">
        <div className="flex flex-row items-start gap-4 pointer-events-none [&>*]:pointer-events-auto">
          {firstRow ? (
            <img
              src={author.avatar}
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 flex items-center justify-center">
              <time
                className="hidden group-hover:block text-xs text-muted-foreground"
                dateTime={at.iso}
              >
                <DisplayTime short dateString={created.toISOString()} />
              </time>
            </div>
          )}
          <div className="flex-1 w-0">
            {firstRow && (
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                <span className="block md:hidden">{author.username}</span>
                <div className="flex flex-row sm:items-center gap-2">
                  {" "}
                  <span className="hidden md:block">{author.username}</span>
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
                          <Shield className="w-4 h-4 text-[#5865F2]" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Moderator</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {author.op && <Badge variant="secondary">OP</Badge>}
                  <Badge variant="outline">{author.reputation}</Badge>
                </div>
                <time
                  className="text-xs text-muted-foreground sm:mt-0"
                  dateTime={at.iso}
                >
                  <DisplayTime dateString={created.toISOString()} />
                </time>
              </div>
            )}

            <Content content={content} attachments={attachments} />
          </div>
        </div>
      </div>
      <ScrollUp />
    </>
  );
};
