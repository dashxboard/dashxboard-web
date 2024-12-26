import { MetadataRoute } from "next";
import { getBaseURL } from "@/lib/utils";
import { db } from "@dashxboard/db";

export const revalidate = 21600; // 6 hours

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const proposals = await db
    .selectFrom("posts")
    .select(["snowflake", "active"])
    .where("indexed", "=", true)
    .limit(50_000)
    .execute();

  return [
    {
      url: getBaseURL(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...proposals.map((p) => {
      return {
        url: `${getBaseURL()}/proposal/${p.snowflake}`,
        changeFrequency: "weekly",
        priority: 0.9,
        lastModified: p.active,
      } satisfies MetadataRoute.Sitemap[0];
    }),
  ];
}
