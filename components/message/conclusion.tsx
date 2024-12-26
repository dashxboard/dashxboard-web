import { ReactNode } from "react";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

type ConclusionProps = { isConcluded: boolean; children: ReactNode };

export const Conclusion = ({ isConcluded, children }: ConclusionProps) => {
  return (
    <div className="w-full">
      <div
        className={cn(
          "rounded-md border p-4",
          isConcluded
            ? "border-blue-500/20 dark:border-blue-400/30 bg-blue-50/50 dark:bg-blue-950/20"
            : "border-neutral-200 dark:border-neutral-800"
        )}
      >
        {children}
        {isConcluded && (
          <div className="flex items-center gap-2 mt-4 text-blue-600 dark:text-blue-400">
            <Bookmark className="w-4 h-4 shrink-0" />
            <span className="text-sm font-medium">Conclusion</span>
          </div>
        )}
      </div>
    </div>
  );
};
