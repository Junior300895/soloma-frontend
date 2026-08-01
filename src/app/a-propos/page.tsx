import type { Metadata } from 'next';
import { Shield, Zap, Handshake, Globe, Award, Users } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';

export const metadata: Metadata = { title: 'À Propos' };

const values = [
  { icon: Shield, title: 'Sécurité', desc: 'Protocoles rigoureux et équipements certifiés aux normes internationales.' },
  { icon: Zap, title: 'Performance', desc: 'Délais respectés, efficacité maximale, résultats mesurables.' },
  { icon: Handshake, title: 'Fiabilité', desc: 'Partenaire de confiance, engagement tenu à chaque opération.' },
  { icon: Globe, title: 'Expertise locale', desc: 'Connaissance approfondie du marché et des spécificités ouest-africains.' },
  { icon: Award, title: 'Excellence', desc: "Standards d'exécution élevés sur chaque chantier, petits ou grands." },
  { icon: Users, title: 'Équipe', desc: 'Techniciens certifiés, ingénieurs expérimentés, engagement humain fort.' },
];

export default function AProposPage() {
  return (
    <>
      <PageHeader
        eyebrow="L'entreprise"
        title="À propos de SOLOMA"
        subtitle="Ingénieurs du levage lourd et de la manutention portuaire en Afrique de l'Ouest. Nous gréons des charges que peu d'acteurs de la région acceptent de manœuvrer."
        readout={'SUARL · DAKAR\nLEVAGE 50–500 T'}
      />

      {/* Mission / Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-tag">Notre histoire</span>
              <h2 className="section-title mt-3 mb-5">Qui sommes-nous ?</h2>
              <p className="text-steel text-sm leading-relaxed mb-4">
                SOLOMA SUARL est une entreprise sénégalaise spécialisée dans la manutention
                portuaire et la location de grues industrielles. Fondée avec l'ambition de
                répondre aux exigences des industries maritimes et industrielles, nous avons
                bâti notre réputation sur des décennies d'opérations réussies.
              </p>
              <p className="text-steel text-sm leading-relaxed mb-6">
                Notre expertise couvre l'ensemble des opérations logistiques portuaires,
                du déchargement de navires à la gestion de marchandises, en passant par le
                levage de structures lourdes sur les chantiers industriels.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border-l-2 border-brand-orange pl-4">
                  <h3 className="font-display font-bold text-navy text-base uppercase tracking-wide mb-1">Notre Mission</h3>
                  <p className="text-steel text-xs leading-relaxed">
                    Offrir des solutions de manutention fiables, sécurisées et performantes,
                    adaptées aux exigences des industries maritimes modernes.
                  </p>
                </div>
                <div className="border-l-2 border-navy pl-4">
                  <h3 className="font-display font-bold text-navy text-base uppercase tracking-wide mb-1">Notre Vision</h3>
                  <p className="text-steel text-xs leading-relaxed">
                    Devenir le leader reconnu de la manutention et du levage industriel
                    en Afrique de l'Ouest.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-80 bg-ink rounded-sm border border-blueprint/30 blueprint-grid overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="readout text-[10px] text-blueprint text-center leading-relaxed">
                  Emplacement image<br />équipe · installations · flotte
                </span>
              </div>
              <span className="absolute top-3 left-3 w-4 h-4 border-t border-l border-brand-orange/70" />
              <span className="absolute top-3 right-3 w-4 h-4 border-t border-r border-brand-orange/70" />
              <span className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-brand-orange/70" />
              <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-brand-orange/70" />
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-16 bg-[#F4F6F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="section-tag">Ce qui nous définit</span>
            <h2 className="section-title mt-3">Nos valeurs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title}
                  className="group bg-white rounded-sm p-5 shadow-sm border border-navy/8
                             hover:shadow-md hover:-translate-y-1 hover:border-brand-orange/40 transition-all duration-200">
                  <div className="w-10 h-10 rounded-sm bg-navy/[0.04] border border-navy/8
                                  flex items-center justify-center mb-3
                                  group-hover:bg-brand-orange/10 group-hover:border-brand-orange/30 transition-colors">
                    <Icon size={20} className="text-navy group-hover:text-brand-orange transition-colors" />
                  </div>
                  <h3 className="font-display font-bold text-navy text-lg uppercase tracking-wide mb-1">{v.title}</h3>
                  <p className="text-steel text-xs leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title-white mb-3">Travaillons ensemble</h2>
          <p className="text-white/50 text-sm mb-7">Contactez notre équipe pour discuter de votre projet.</p>
          <Link href="/contact" className="btn-primary mx-auto">Nous contacter</Link>
        </div>
      </section>
    </>
  );
}
