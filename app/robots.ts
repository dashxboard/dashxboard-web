import { MetadataRoute } from "next";
import { getBaseURL } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/proposals", "/proposals/", "/proposal/"],
    },
    sitemap: `${getBaseURL()}/sitemap.xml`,
  };
}
