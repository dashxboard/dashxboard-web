import Link from "next/link";
import React from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site-config";

export function GovernanceHero() {
  return (
    <div className="w-full mx-auto flex flex-col gap-1 py-8">
      <h1 className="text-3xl font-extrabold">Governance</h1>
      <p className="text-muted-foreground">
        Reference to the official Stronghold Governance.
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
          <Link href={site.links.vote} target="_blank" rel="noreferrer">
            Vote
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
          <Link href={site.links.governance} target="_blank" rel="noreferrer">
            Documentation
          </Link>
        </Button>
      </div>
    </div>
  );
}
