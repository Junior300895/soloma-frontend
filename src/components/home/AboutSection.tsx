import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/* Des capacités mesurables, pas des slogans */
const capabilities = [
  { tag: 'CAP', label: 'Levage jusqu’à 500 T' },
  { tag: 'OPS', label: 'Opérations 24 h / 24, 7 j / 7' },
  { tag: 'GPS', label: 'Suivi des flux en temps réel' },
  { tag: 'HSE', label: 'Grutiers & rigueurs certifiés' },
];

export function AboutSection() {
  return (
    <section className="bg-ink py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-[0.04]" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Panneau technique */}
          <div className="relative rounded-sm border border-blueprint/30 bg-ink-2/70 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
              <span className="readout text-[10px] text-blueprint">BASE OPÉRATIONNELLE</span>
              <span className="readout text-[10px] text-blueprint">PORT DE DAKAR · 14.68°N 17.43°W</span>
            </div>
            <div className="relative h-64 lg:h-80 blueprint-grid">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="readout text-steel text-center leading-relaxed">
                  Emplacement image<br />
                  <span className="text-[10px] text-blueprint">installations · quai · flotte</span>
                </span>
              </div>
              {/* équerres de cadrage */}
              <span className="absolute top-3 left-3 w-4 h-4 border-t border-l border-brand-orange/70" />
              <span className="absolute top-3 right-3 w-4 h-4 border-t border-r border-brand-orange/70" />
              <span className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-brand-orange/70" />
              <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-brand-orange/70" />
            </div>
          </div>

          {/* Contenu */}
          <div>
            <span className="section-tag">Qui sommes-nous</span>
            <h2 className="section-title-white mt-3 mb-5">
              Le partenaire levage<br />des industries de l'Ouest
            </h2>
            <p className="text-steel text-[15px] leading-relaxed mb-8 max-w-xl">
              SOLOMA SUARL est née pour répondre aux exigences des ports et des chantiers
              lourds : mobiliser la bonne capacité, au bon rayon, dans les délais. Nous gréons
              des charges que peu d'acteurs de la région acceptent de manœuvrer.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-9">
              {capabilities.map((c) => (
                <li key={c.label}
                  className="flex items-center gap-3 bg-white/[0.03] border border-white/10
                             rounded-sm px-3.5 py-3">
                  <span className="font-mono text-[10px] tracking-[0.15em] text-brand-orange
                                   border border-brand-orange/40 rounded-sm px-1.5 py-0.5 shrink-0">
                    {c.tag}
                  </span>
                  <span className="text-chalk/90 text-sm font-medium">{c.label}</span>
                </li>
              ))}
            </ul>

            <Link href="/a-propos" className="btn-primary">
              Notre histoire <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
