import { PropsWithChildren } from "react";
import { Metadata } from "next";
import { FAQHero } from "@/components/faq/faq-hero";
import { ScrollUp } from "@/components/ui/scrollup-button";
import { ProgressBar } from "@/components/ui/progess-bar";
import { getBaseURL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Find answers to the most common questions about the Dashxboard, features, and community guidelines.",
  alternates: { canonical: `${getBaseURL()}/faq` },
  openGraph: {
    title: "FAQ",
    description:
      "Find answers to the most common questions about the Dashxboard, features, and community guidelines.",
    type: "website",
    url: `${getBaseURL()}/faq`,
    images: {
      url: `${getBaseURL()}/og-image.png`,
      width: 1200,
      height: 630,
      alt: "FAQ",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ",
    description:
      "Find answers to the most common questions about the Dashxboard, features, and community guidelines.",
    images: [`${getBaseURL()}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FAQLayout({ children }: PropsWithChildren) {
  return (
    <>
      <ProgressBar />
      <div className="w-full mx-auto flex flex-col gap-1 sm:min-h-[91vh] min-h-[88vh] pt-2">
        <FAQHero />
        <div className="mt-1 pt-12 border-t">{children}</div>
        <ScrollUp />
      </div>
    </>
  );
}
