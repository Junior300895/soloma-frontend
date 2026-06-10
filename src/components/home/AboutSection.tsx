import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const values = [
  { icon: '🛡️', label: 'Sécurité absolue' },
  { icon: '⚡', label: 'Performance prouvée' },
  { icon: '🤝', label: 'Fiabilité totale' },
  { icon: '🌍', label: 'Expertise locale' },
];

export function AboutSection() {
  return (
    <section className="bg-navy py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual placeholder */}
          <div className="relative h-72 lg:h-96 bg-navy-light rounded-sm border border-brand-orange/20
                          flex items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: 'linear-gradient(#E8601C 1px, transparent 1px), linear-gradient(90deg, #E8601C 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
            />
            <p className="text-white/20 text-sm tracking-[3px] uppercase text-center">
              📸<br />Photo des<br />installations
            </p>
          </div>

          {/* Content */}
          <div>
            <span className="section-tag">Qui sommes-nous</span>
            <h2 className="section-title-white mt-1 mb-4">
              Leader de la manutention<br />en Afrique de l'Ouest
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              SOLOMA SUARL est une entreprise spécialisée dans la manutention portuaire
              et la location de grues industrielles. Fondée avec l'ambition de répondre
              aux exigences des industries maritimes, nous avons bâti notre réputation
              sur la fiabilité, la sécurité et la performance.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-7">
              {values.map((v) => (
                <div
                  key={v.label}
                  className="flex items-center gap-2 bg-white/5 border border-white/8
                             rounded-sm px-3 py-2.5 text-sm text-white/75 font-medium"
                >
                  <span className="text-base">{v.icon}</span>
                  {v.label}
                </div>
              ))}
            </div>

            <Link href="/a-propos" className="btn-primary">
              Notre histoire <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
