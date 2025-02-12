import Link from "next/link";
import React from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site-config";

export function ProposalsHero() {
  return (
    <div className="w-full mx-auto flex flex-col gap-1 py-8">
      <h1 className="text-3xl font-extrabold">From ideas to actions</h1>
      <p className="text-muted-foreground">
        Meet the Stronghold (SHx) community, join the discussion, and shape
        tomorrow.
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
          <Link href={site.links.discord} target="_blank" rel="noreferrer">
            Discord Community
          </Link>
        </Button>
        <Button
          variant="secondary"
          effect="expandIcon"
          icon={ExternalLink}
          iconPlacement="right"
          size="sm"
          asChild
        >
          <Link href="/faq">Learn more</Link>
        </Button>
      </div>
    </div>
  );
}
