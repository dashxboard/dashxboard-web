import { MetadataRoute } from "next";
import { getBaseURL } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
    },
    sitemap: `${getBaseURL()}/sitemap.xml`,
  };
}
