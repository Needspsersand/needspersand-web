import type { MetadataRoute } from "next";
import { fetchAllPostIds } from "@/lib/posts";

const BASE = "https://needspersand.co.kr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchAllPostIds();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE}/notice`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/notice/${p.id}`,
    lastModified: new Date((p.published_at as string) || Date.now()),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
