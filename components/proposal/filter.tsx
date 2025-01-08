"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Proposal } from "@/components/proposal/proposal";

type ProposalType = {
  id: string;
  snowflake: string;
  title: string;
  messagesCount: string | null;
  participantsCount: string | null;
  created: Date;
  category: string | null;
  isConcluded: boolean;
  username: string;
};

export function Filter({
  proposals: initialProposals,
}: {
  proposals: ProposalType[];
}) {
  const [active, setActive] = useState<string | null>(null);
  const [filteredProposals, setFilteredProposals] = useState(initialProposals);

  const handleFilter = (filter: string | null) => {
    setActive(filter);

    const filtered = initialProposals.filter((proposal) => {
      if (!filter) return true;

      switch (filter) {
        case "official":
          return proposal.category === "official";
        case "community":
          return proposal.category === "community";
        case "open":
          return !proposal.isConcluded;
        case "concluded":
          return proposal.isConcluded;
        default:
          return true;
      }
    });
    setFilteredProposals(filtered);
  };

  return (
    <>
      <div className="flex flex-wrap sm:flex-nowrap items-center mb-6">
        <span className="text-foreground/70 mr-2">Filter by:</span>
        <div className="inline-flex flex-wrap gap-2 sm:space-x-2">
          <Badge
            variant={active === null ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => handleFilter(null)}
          >
            All
          </Badge>
          <Badge
            variant={active === "official" ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => handleFilter("official")}
          >
            Official
          </Badge>
          <Badge
            variant={active === "community" ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => handleFilter("community")}
          >
            Community
          </Badge>
          <Badge
            variant={active === "open" ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => handleFilter("open")}
          >
            Open
          </Badge>
          <Badge
            variant={active === "concluded" ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => handleFilter("concluded")}
          >
            Concluded
          </Badge>
        </div>
      </div>
      <div
        id="proposals-container"
        className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-8 gap-4 mb-5"
      >
        {filteredProposals.map((proposal) => (
          <Proposal
            key={proposal.id.toString()}
            title={proposal.title}
            messagesCount={parseInt(proposal.messagesCount ?? "0", 10)}
            participantsCount={parseInt(proposal.participantsCount ?? "0", 10)}
            created={proposal.created}
            category={proposal.category}
            isConcluded={proposal.isConcluded}
            author={{
              username: proposal.username,
            }}
          />
        ))}
      </div>
    </>
  );
}
