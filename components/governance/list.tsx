import { Balancer } from "react-wrap-balancer";
import { FrownIcon } from "lucide-react";
import { ScrollUp } from "@/components/scrollup";
import { GovernanceCard } from "@/components/governance/card";
import { governanceCard } from "@/lib/proposals";

export function List() {
  const sortedProposals = [...governanceCard].sort((a, b) => {
    const aNum = parseInt(a.id.split("-")[1]);
    const bNum = parseInt(b.id.split("-")[1]);
    return bNum - aNum;
  });

  if (sortedProposals.length === 0) {
    return (
      <div className="flex flex-col space-y-2 items-center justify-center min-h-[50vh]">
        <FrownIcon size={48} className="opacity-75" />
        <div className="text-xl text-center w-full opacity-80">
          <Balancer>
            Currently, no official proposals have been posted. Check back later!
          </Balancer>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-8 gap-4 mb-5">
        {sortedProposals.map((card) => (
          <GovernanceCard key={card.id} {...card} />
        ))}
      </div>
      <ScrollUp />
    </>
  );
}
