import type { Metadata } from 'next';
import { Shield, Zap, Handshake, Globe, Award, Users } from 'lucide-react';
import Link from 'next/link';

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
      <div className="bg-navy pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-steel text-xs uppercase tracking-widest mb-2">L'entreprise</p>
          <h1 className="font-display font-black text-white text-4xl md:text-5xl uppercase tracking-wide">
            À Propos de SOLOMA
          </h1>
        </div>
      </div>

      {/* Mission / Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-tag">Notre histoire</span>
              <h2 className="section-title mt-1 mb-5">Qui sommes-nous ?</h2>
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
                <div className="border-l-4 border-brand-orange pl-4">
                  <h3 className="font-bold text-navy text-sm uppercase tracking-wide mb-1">Notre Mission</h3>
                  <p className="text-steel text-xs leading-relaxed">
                    Offrir des solutions de manutention fiables, sécurisées et performantes,
                    adaptées aux exigences des industries maritimes modernes.
                  </p>
                </div>
                <div className="border-l-4 border-navy pl-4">
                  <h3 className="font-bold text-navy text-sm uppercase tracking-wide mb-1">Notre Vision</h3>
                  <p className="text-steel text-xs leading-relaxed">
                    Devenir le leader reconnu de la manutention et du levage industriel
                    en Afrique de l'Ouest.
                  </p>
                </div>
              </div>
            </div>

            <div className="h-80 bg-[#F4F6F9] rounded-sm border border-navy/10 flex items-center justify-center">
              <p className="text-steel/40 text-xs tracking-wider uppercase text-center">
                📸<br />Photo de l'équipe<br />ou des installations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-16 bg-[#F4F6F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-tag">Ce qui nous définit</span>
            <h2 className="section-title mt-1">Nos Valeurs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-white rounded-sm p-5 shadow-sm border border-navy/5">
                  <div className="w-10 h-10 rounded-sm bg-brand-orange/10 flex items-center justify-center mb-3">
                    <Icon size={20} className="text-brand-orange" />
                  </div>
                  <h3 className="font-bold text-navy text-sm uppercase tracking-wide mb-1">{v.title}</h3>
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
