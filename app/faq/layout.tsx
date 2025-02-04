import { PropsWithChildren } from "react";
import { Metadata } from "next";
import { FAQHero } from "@/components/hero";
import { ScrollUp } from "@/components/scrollup";
import { Progress } from "@/components/progess";
import { getBaseURL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Find answers to the most common questions about the Dashxboard, features, and community guidelines.",
  alternates: { canonical: `${getBaseURL()}/faq` },
  openGraph: {
    title: "FAQ - Dashxboard",
    description:
      "Find answers to the most common questions about the Dashxboard, features, and community guidelines.",
    url: `${getBaseURL()}/faq`,
    type: "website",
  },
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
        <FAQHero />
        <div className="mt-1 pt-12 border-t">{children}</div>
        <ScrollUp />
      </div>
    </>
  );
}
