import { Balancer } from "react-wrap-balancer";
import { FrownIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollUp } from "@/components/scrollup";
import { GovernanceCard } from "@/components/governance/card";
import { governanceCard } from "@/lib/proposals";

const CARDS_BY_PAGE = 20;

type GovernanceProps = {
  page: number;
};

export function List({ page }: GovernanceProps) {
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

  const hasNext = sortedProposals.length > page * CARDS_BY_PAGE;
  const toRender = sortedProposals.slice(
    (page - 1) * CARDS_BY_PAGE,
    page * CARDS_BY_PAGE
  );
  const hasPrevious = page > 1;

  return (
    <>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-8 gap-4 mb-5">
        {toRender.map((card) => (
          <GovernanceCard key={card.id} {...card} />
        ))}
      </div>
      <div className="mt-4 flex space-x-4 justify-center">
        {(hasPrevious || hasNext) && (
          <Pagination className="mt-4">
            <PaginationContent>
              {hasPrevious && (
                <PaginationItem>
                  <PaginationPrevious
                    href={
                      page - 1 === 1
                        ? "/governance"
                        : `/governance/page/${page - 1}`
                    }
                  />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink
                  href={page === 1 ? "/governance" : `/governance/page/${page}`}
                  isActive
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
              {hasNext && (
                <PaginationItem>
                  <PaginationNext href={`/governance/page/${page + 1}`} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </div>
      <ScrollUp />
    </>
  );
}
