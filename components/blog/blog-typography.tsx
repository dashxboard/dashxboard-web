import { PropsWithChildren } from "react";

export function Typography({ children }: PropsWithChildren) {
  return (
    <div className="prose prose-foreground dark:prose-invert max-w-none w-full prose-code:font-normal prose-code:font-code prose-code:bg-accent/30 prose-code:text-foreground prose-pre:bg-background prose-headings:scroll-m-20 prose-code:p-[0.085rem] prose-code:rounded-md prose-code:border prose-code:border-border prose-img:rounded-md prose-img:border prose-img:border-border prose-code:before:content-none prose-code:after:content-none prose-code:px-1.5 prose-code:overflow-x-auto prose-img:my-3 prose-h2:my-4 prose-h2:mt-8">
      {children}
    </div>
  );
}
