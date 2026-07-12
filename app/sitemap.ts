import { MetadataRoute } from "next";
import { prisma } from "@/prisma";

const siteUrl = "https://jobboard.stoneageengines.tech";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/jobs`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/companies`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/about-us`, changeFrequency: "monthly", priority: 0.5 },
  ];

  let jobRoutes: MetadataRoute.Sitemap = [];
  try {
    const jobs = await prisma.jobListing.findMany({
      where: { isActive: true },
      select: { id: true, postedAt: true },
    });
    jobRoutes = jobs.map((job) => ({
      url: `${siteUrl}/jobs/${job.id}`,
      lastModified: job.postedAt,
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  } catch {
    // If the DB is unreachable at build time, still ship the static routes.
    jobRoutes = [];
  }

  return [...staticRoutes, ...jobRoutes];
}
