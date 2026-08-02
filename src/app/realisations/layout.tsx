import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Réalisations — levages et manutentions',
  description:
    'Nos chantiers de levage lourd et de manutention exécutés sur les quais et sites industriels d’Afrique de l’Ouest.',
  alternates: { canonical: '/realisations' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
