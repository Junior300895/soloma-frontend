import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-navy overflow-hidden pt-16">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#E8601C 1px, transparent 1px), linear-gradient(90deg, #E8601C 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Diagonal accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-navy-light/30 clip-diagonal" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-orange/15 border border-brand-orange/40
                          text-brand-orange px-4 py-1.5 rounded-sm mb-6 text-xs font-semibold tracking-[2px] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
            Opérations 24h/24 — 7j/7
          </div>

          {/* Heading */}
          <h1 className="font-display font-black text-white uppercase leading-[1.0] tracking-wide mb-6"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            Excellence en
            <span className="block text-brand-orange">Manutention</span>
            Portuaire
          </h1>

          {/* Sub */}
          <p className="text-white/65 text-lg leading-relaxed mb-8 max-w-xl">
            Votre partenaire de confiance pour la manutention, le levage industriel
            et la logistique en Afrique de l'Ouest. Fiabilité, sécurité et performance
            à chaque opération.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary">
              Demander un devis
              <ArrowRight size={16} />
            </Link>
            <Link href="/services" className="btn-outline">
              Découvrir nos services
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs tracking-[3px] uppercase">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </div>
    </section>
  );
}
