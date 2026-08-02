import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

const API = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/v1').replace(/\/$/, '');

/** Récupère un tableau depuis l'API en tolérant les erreurs (build ne casse jamais). */
async function fetchList(path: string): Promise<any[]> {
  try {
    const res = await fetch(`${API}${path}`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const body = await res.json();
    return Array.isArray(body?.data) ? body.data : [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/catalogue-grues`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/realisations`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/actualites`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/a-propos`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${SITE_URL}/mentions-legales`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/politique-confidentialite`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const [services, projects, posts] = await Promise.all([
    fetchList('/services'),
    fetchList('/projects?limit=200'),
    fetchList('/posts?limit=200'),
  ]);

  const serviceRoutes: MetadataRoute.Sitemap = services
    .filter((s) => s?.slug)
    .map((s) => ({ url: `${SITE_URL}/services/${s.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 }));

  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((p) => p?.id)
    .map((p) => ({ url: `${SITE_URL}/realisations/${p.id}`, lastModified: p.createdAt ? new Date(p.createdAt) : now, changeFrequency: 'monthly', priority: 0.6 }));

  const postRoutes: MetadataRoute.Sitemap = posts
    .filter((p) => p?.slug)
    .map((p) => ({ url: `${SITE_URL}/actualites/${p.slug}`, lastModified: p.publishedAt ? new Date(p.publishedAt) : now, changeFrequency: 'monthly', priority: 0.6 }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...postRoutes];
}
