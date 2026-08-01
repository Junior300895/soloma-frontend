import Link from 'next/link';
import { Phone, FileDown } from 'lucide-react';

export function CtaBand() {
  return (
    <section className="bg-brand-orange relative overflow-hidden">
      {/* filet mesure haut */}
      <div className="absolute top-0 inset-x-0 h-px bg-white/30" aria-hidden />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col md:flex-row
                      items-start md:items-center justify-between gap-6">
        <div>
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/70">
            Réponse sous 24 h · devis chiffré
          </span>
          <h2 className="font-display font-extrabold text-white text-4xl md:text-5xl uppercase
                         tracking-[0.01em] leading-[0.95] mt-2">
            Un levage à planifier ?
          </h2>
          <p className="text-white/85 text-sm mt-2 max-w-md">
            Décrivez votre charge et votre site : nous revenons avec la capacité,
            le rayon et le planning.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Link href="/contact"
            className="inline-flex items-center gap-2 bg-ink text-white font-semibold
                       px-6 py-3.5 rounded-sm text-sm uppercase tracking-wide
                       hover:bg-ink-2 transition-colors">
            <Phone size={15} /> Demander un devis
          </Link>
          <a href="/brochure-soloma.pdf"
            className="inline-flex items-center gap-2 border border-white/70 text-white
                       font-semibold px-6 py-3.5 rounded-sm text-sm uppercase tracking-wide
                       hover:bg-white/10 transition-colors">
            <FileDown size={15} /> Brochure
          </a>
        </div>
      </div>
    </section>
  );
}
