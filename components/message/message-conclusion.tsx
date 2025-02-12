import { ReactNode } from "react";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

type MessageConclusionProps = { isConcluded: boolean; children: ReactNode };

export const MessageConclusion = ({
  isConcluded,
  children,
}: MessageConclusionProps) => {
  return (
    <div className="w-full">
      <div
        className={cn(
          "rounded-md border p-4 border-border",
          isConcluded && "border-primary/30"
        )}
      >
        {children}
        {isConcluded && (
          <div className="flex items-center gap-2 mt-4 text-primary">
            <Bookmark className="w-4 h-4 shrink-0" />
            <span className="text-sm font-medium">Conclusion</span>
          </div>
        )}
      </div>
    </div>
  );
};
