import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site-config";

export function BlogHero() {
  return (
    <div className="w-full mx-auto flex flex-col gap-1 py-8">
      <h1 className="text-3xl font-extrabold">Community blog</h1>
      <p className="text-muted-foreground">
        Dive into community-driven blogs covering SHx governance and the
        Dashxboard platform — written by the community, for the community.
      </p>
      <div className="flex w-full items-center justify-start gap-2 py-2">
        <Button
          variant="default"
          effect="expandIcon"
          icon={ArrowRight}
          iconPlacement="right"
          size="sm"
          asChild
        >
          <Link href={site.links.blog} target="_blank" rel="noreferrer">
            Get involved
          </Link>
        </Button>
      </div>
    </div>
  );
}
