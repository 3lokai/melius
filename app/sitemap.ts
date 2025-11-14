import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://melius-ajnahal.com";
  const lastMod = new Date();

  return [
    {
      url: siteUrl,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
