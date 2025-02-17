import { PropsWithChildren } from "react";
import { Metadata } from "next";
import { GovernanceHero } from "@/components/governance/governance-hero";
import { ScrollUp } from "@/components/ui/scrollup-button";
import { ProgressBar } from "@/components/ui/progess-bar";
import { getBaseURL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Governance",
  description: "Reference to the official Stronghold Governance.",
  alternates: { canonical: `${getBaseURL()}/governance` },
  openGraph: {
    title: "Governance",
    description: "Reference to the official Stronghold Governance.",
    type: "website",
    url: `${getBaseURL()}/governance`,
    images: [
      {
        url: `${getBaseURL()}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Governance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Governance",
    description: "Reference to the official Stronghold Governance.",
    images: [`${getBaseURL()}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GovernanceLayout({ children }: PropsWithChildren) {
  return (
    <>
      <ProgressBar />
      <div className="w-full mx-auto flex flex-col gap-1 sm:min-h-[91vh] min-h-[88vh] pt-2">
        <GovernanceHero />
        <div className="mt-1 pt-12 border-t">{children}</div>
        <ScrollUp />
      </div>
    </>
  );
}
