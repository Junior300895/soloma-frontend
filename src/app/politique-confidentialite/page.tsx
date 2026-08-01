import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';

export const metadata: Metadata = { title: 'Politique de confidentialité' };

const sections = [
  {
    title: 'Données que nous collectons',
    body: [
      'Lorsque vous remplissez un formulaire de contact ou de devis, nous collectons les informations que vous fournissez : nom, email, téléphone, entreprise et le détail de votre demande.',
      'Aucune donnée sensible n\'est demandée. Nous ne collectons pas de coordonnées bancaires via ce site.',
    ],
  },
  {
    title: 'Usage des données',
    body: [
      'Vos données servent uniquement à traiter votre demande : établir un devis, répondre à un message, planifier une opération.',
      'Elles ne sont ni vendues, ni cédées, ni utilisées à des fins publicitaires.',
    ],
  },
  {
    title: 'Conservation',
    body: [
      'Les demandes sont conservées le temps nécessaire au suivi commercial, puis archivées ou supprimées.',
      'Vous pouvez demander la suppression de vos données à tout moment.',
    ],
  },
  {
    title: 'Cookies',
    body: [
      'Ce site utilise uniquement les cookies techniques nécessaires à son fonctionnement. Aucun cookie de traçage publicitaire n\'est déposé sans votre accord.',
    ],
  },
  {
    title: 'Vos droits',
    body: [
      'Vous disposez d\'un droit d\'accès, de rectification et de suppression de vos données.',
      'Pour exercer ces droits, écrivez à contact@soloma.sn.',
    ],
  },
];

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <PageHeader
        eyebrow="Vos données"
        title="Politique de confidentialité"
        subtitle="Comment SOLOMA collecte, utilise et protège les informations que vous nous confiez."
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
