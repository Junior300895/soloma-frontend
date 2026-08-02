import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catalogue de grues — 50 à 500 tonnes',
  description:
    'Flotte de grues mobiles de 50 à 500 tonnes disponibles à la location au Sénégal : capacité, flèche et rayon pour chaque équipement.',
  alternates: { canonical: '/catalogue-grues' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
