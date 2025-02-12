import { ProposalList } from "@/components/proposal/proposal-list";

export const dynamic = "error";
export const revalidate = 60;

const Proposals = async () => {
  return <ProposalList />;
};

export default Proposals;
