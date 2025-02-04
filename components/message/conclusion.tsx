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
            ? "border-[#5865F2]/30 dark:border-[#7289DA]/30 bg-[#5865F2]/5 dark:bg-[#7289DA]/5"
            : "border-neutral-200 dark:border-neutral-800"
        )}
      >
        {children}
        {isConcluded && (
          <div className="flex items-center gap-2 mt-4 text-[#5865F2] dark:text-[#7289DA]">
            <Bookmark className="w-4 h-4 shrink-0" />
            <span className="text-sm font-medium">Conclusion</span>
          </div>
        )}
      </div>
    </div>
  );
};
