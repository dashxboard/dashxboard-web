import { PropsWithChildren } from "react";
import { Metadata } from "next";
import { ProposalsHero } from "@/components/proposal/proposal-hero";
import { ScrollUp } from "@/components/ui/scrollup-button";
import { ProgressBar } from "@/components/ui/progess-bar";
import { getBaseURL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Proposals",
  alternates: { canonical: getBaseURL() },
};

export default function ProposalsLayout({ children }: PropsWithChildren) {
  return (
    <>
      <ProgressBar />
      <div className="w-full mx-auto flex flex-col gap-1 sm:min-h-[91vh] min-h-[88vh] pt-2">
        <ProposalsHero />
        <div className="mt-1 pt-12 border-t">{children}</div>
        <ScrollUp />
      </div>
    </>
  );
}
