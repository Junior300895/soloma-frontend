import type { Metadata } from 'next';

const API = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/v1').replace(/\/$/, '');

async function getProject(id: string): Promise<any | null> {
  try {
    const res = await fetch(`${API}/projects/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const body = await res.json();
    return body?.data ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const project = await getProject(params.id);
  if (!project) {
    return { title: 'Réalisation', alternates: { canonical: `/realisations/${params.id}` } };
  }
  const description =
    project.description?.slice(0, 160) ||
    `${project.title}${project.client ? ` — ${project.client}` : ''} · SOLOMA SUARL`;
  return {
    title: project.title,
    description,
    alternates: { canonical: `/realisations/${params.id}` },
    openGraph: {
      type: 'article',
      title: project.title,
      description,
      url: `/realisations/${params.id}`,
      ...(project.coverImage ? { images: [{ url: project.coverImage }] } : {}),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
