import { MetadataRoute } from "next";
import { getPaths } from "@/lib/markdown-config";
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

  const slugs = await getPaths("blog");
  const posts = slugs.map((slug) => ({
    url: `${getBaseURL()}/blog/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
    lastModified: new Date().toISOString(),
  }));

  return [
    {
      url: getBaseURL(),
      changeFrequency: "daily",
      lastModified: new Date().toISOString(),
      priority: 1,
    },
    {
      url: `${getBaseURL()}/governance`,
      changeFrequency: "weekly",
      lastModified: new Date().toISOString(),
      priority: 0.8,
    },
    {
      url: `${getBaseURL()}/faq`,
      changeFrequency: "weekly",
      lastModified: new Date().toISOString(),
      priority: 0.8,
    },
    ...proposals.map((p) => {
      return {
        url: `${getBaseURL()}/proposal/${p.snowflake}`,
        changeFrequency: "weekly",
        priority: 0.7,
        lastModified: p.active,
      } satisfies MetadataRoute.Sitemap[0];
    }),
    ...posts,
  ];
}
