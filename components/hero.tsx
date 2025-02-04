import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

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
        <Button variant="link" effect="hoverUnderline" size="sm" asChild>
          <Link href="/faq">Learn more</Link>
        </Button>
      </div>
    </div>
  );
}

export function GovernanceHero() {
  return (
    <div className="w-full mx-auto flex flex-col gap-1 py-8">
      <h1 className="text-3xl font-extrabold">Governance</h1>
      <p className="text-muted-foreground">
        Reference to the official Stronghold Governance.
      </p>
      <div className="flex w-full items-center justify-start gap-2 py-2">
        <Button
          effect="expandIcon"
          icon={ArrowRight}
          iconPlacement="right"
          size="sm"
          asChild
        >
          <Link href={site.links.vote} target="_blank" rel="noreferrer">
            Vote
          </Link>
        </Button>
        <Button variant="link" effect="hoverUnderline" size="sm" asChild>
          <Link href={site.links.governance} target="_blank" rel="noreferrer">
            Documentation
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function FAQHero() {
  return (
    <div className="w-full mx-auto flex flex-col gap-1 py-8">
      <h1 className="text-3xl font-extrabold">FAQs</h1>
      <p className="text-muted-foreground">
        Find answers to the most common questions about the Dashxboard,
        features, and community guidelines.
      </p>
      <div className="flex w-full items-center justify-start gap-2 py-2">
        <Button
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
      </div>
    </div>
  );
}
