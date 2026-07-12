import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = "https://jobboard.stoneageengines.tech";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/api", "/login", "/unauthorized"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
