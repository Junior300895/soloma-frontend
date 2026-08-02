import type { Metadata } from 'next';

const API = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/v1').replace(/\/$/, '');

async function getPost(slug: string): Promise<any | null> {
  try {
    const res = await fetch(`${API}/posts/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const body = await res.json();
    return body?.data ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) {
    return { title: 'Article', alternates: { canonical: `/actualites/${params.slug}` } };
  }
  const description = post.excerpt || `${post.title} — SOLOMA SUARL`;
  return {
    title: post.title,
    description,
    alternates: { canonical: `/actualites/${params.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      url: `/actualites/${params.slug}`,
      ...(post.coverImage ? { images: [{ url: post.coverImage }] } : {}),
      ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
