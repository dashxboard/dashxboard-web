import { PropsWithChildren } from "react";
import { Metadata } from "next";
import { GovernanceHero } from "@/components/hero";
import { Progress } from "@/components/progess";
import { getBaseURL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Governance",
  alternates: { canonical: getBaseURL() },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ProposalsLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Progress />
      <div className="w-full mx-auto flex flex-col gap-1 sm:min-h-[91vh] min-h-[88vh] pt-2">
        <GovernanceHero />
        <div className="mt-1 pt-12 border-t">{children}</div>
      </div>
    </>
  );
}
