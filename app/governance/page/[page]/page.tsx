import { List } from "@/components/governance/list";

type GovernancePageParams = Promise<{ page: string }>;

export default async function GovernancePage(props: {
  params: GovernancePageParams;
}) {
  const params = await props.params;

  const pageNumber = parseInt(params.page, 10);
  return <List page={pageNumber} />;
}
