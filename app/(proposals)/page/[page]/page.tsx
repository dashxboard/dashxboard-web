import { notFound } from "next/navigation";
import { List } from "@/components/proposal/list";

type PageParams = Promise<{ page: string }>;

export default async function Page(props: { params: PageParams }) {
  const params = await props.params;
  const page = parseInt(params.page, 10);

  if (!/^\d+$/g.test(params.page)) {
    notFound();
  }

  if (Number.isNaN(page) || page < 1) {
    notFound();
  }

  return <List page={page} />;
}