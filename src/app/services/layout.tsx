import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nos métiers — manutention, levage, logistique',
  description:
    'Du quai au chantier : manutention portuaire, levage industriel, opérations logistiques et suivi. Un interlocuteur, de l’étude à la dépose.',
  alternates: { canonical: '/services' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
