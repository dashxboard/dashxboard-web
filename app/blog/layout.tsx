import { PropsWithChildren } from "react";
import { Metadata } from "next";
import { BlogHero } from "@/components/blog/blog-hero";
import { ScrollUp } from "@/components/ui/scrollup-button";
import { ProgressBar } from "@/components/ui/progess-bar";
import { getBaseURL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Dive into community-driven blogs covering SHx governance and the Dashxboard platform—written by the community, for the community.",
  alternates: { canonical: `${getBaseURL()}/blog` },
  openGraph: {
    title: "Blog",
    description:
      "Dive into community-driven blogs covering SHx governance and the Dashxboard platform—written by the community, for the community.",
    type: "website",
    url: `${getBaseURL()}/blog`,
    images: [
      {
        url: `${getBaseURL()}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description:
      "Dive into community-driven blogs covering SHx governance and the Dashxboard platform—written by the community, for the community.",
    images: [`${getBaseURL()}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogLayout({ children }: PropsWithChildren) {
  return (
    <>
      <ProgressBar />
      <div className="w-full mx-auto flex flex-col gap-1 sm:min-h-[91vh] min-h-[88vh] pt-2">
        <BlogHero />
        <div className="mt-1 pt-12 border-t">{children}</div>
        <ScrollUp />
      </div>
    </>
  );
}
