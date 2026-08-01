import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';

export const metadata: Metadata = { title: 'Mentions légales' };

const sections = [
  {
    title: 'Éditeur du site',
    body: [
      'SOLOMA SUARL — Société Unipersonnelle à Responsabilité Limitée.',
      'Siège social : Dakar, Sénégal.',
      'NINEA : [à compléter] · Registre du commerce : [à compléter].',
      'Contact : contact@soloma.sn · +221 XX XXX XX XX.',
    ],
  },
  {
    title: 'Directeur de la publication',
    body: ['[Nom du responsable de la publication], en sa qualité de gérant de SOLOMA SUARL.'],
  },
  {
    title: 'Hébergement',
    body: [
      'Frontend hébergé par Vercel Inc. — 340 S Lemon Ave #4133, Walnut, CA 91789, USA.',
      'API hébergée par Render Services, Inc.',
      'Base de données gérée par Aiven Ltd.',
    ],
  },
  {
    title: 'Propriété intellectuelle',
    body: [
      "L'ensemble des contenus de ce site (textes, visuels, logos, mise en page) est la propriété de SOLOMA SUARL, sauf mention contraire.",
      'Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite préalable est interdite.',
    ],
  },
  {
    title: 'Responsabilité',
    body: [
      'SOLOMA SUARL met tout en œuvre pour assurer l\'exactitude des informations publiées, sans pouvoir en garantir l\'exhaustivité.',
      'Les caractéristiques techniques des équipements sont données à titre indicatif et confirmées lors de l\'établissement du devis.',
    ],
  },
];

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Informations légales"
        title="Mentions légales"
        subtitle="Éditeur, hébergement et conditions d'utilisation du site SOLOMA SUARL."
        readout={'MAJ ' + new Date().getFullYear()}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="font-display font-bold text-navy text-xl uppercase tracking-wide mb-3">{s.title}</h2>
            <div className="space-y-2">
              {s.body.map((p, i) => (
                <p key={i} className="text-steel text-sm leading-relaxed">{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
