import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Actualités — chantiers & quais',
  description:
    'Les actualités de SOLOMA SUARL : opérations de levage, manutention portuaire et vie de l’entreprise au Sénégal.',
  alternates: { canonical: '/actualites' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
