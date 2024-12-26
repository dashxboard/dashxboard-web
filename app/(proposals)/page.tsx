import { List } from "@/components/proposal/list";

export const dynamic = "error";
export const revalidate = 60;

const Proposals = async () => {
  return <List page={1} />;
};

export default Proposals;
