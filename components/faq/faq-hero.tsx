import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site-config";

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
      </div>
    </div>
  );
}
