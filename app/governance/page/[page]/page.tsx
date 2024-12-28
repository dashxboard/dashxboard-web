import { Metadata } from "next";
import { List } from "@/components/governance/list";
import { getBaseURL } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: getBaseURL() },
  robots: {
    index: false,
    follow: false,
  },
};

type GovernancePageParams = Promise<{ page: string }>;

export default async function GovernancePage(props: {
  params: GovernancePageParams;
}) {
  const params = await props.params;

  const pageNumber = parseInt(params.page, 10);
  return <List page={pageNumber} />;
}
