import Link from 'next/link';
import { Phone, FileDown } from 'lucide-react';

export function CtaBand() {
  return (
    <section className="bg-brand-orange py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row
                      items-center justify-between gap-6">
        <div>
          <h2 className="font-display font-black text-white text-3xl uppercase tracking-wide leading-tight">
            Prêt pour votre prochain projet ?
          </h2>
          <p className="text-white/80 text-sm mt-1">
            Notre équipe est disponible 24h/24 pour répondre à vos besoins.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-brand-orange font-bold
                       px-6 py-3 rounded-sm text-sm uppercase tracking-wide hover:bg-[#F4F6F9] transition-colors"
          >
            <Phone size={15} /> Parler à un expert
          </Link>
          <a
            href="/brochure-soloma.pdf"
            className="inline-flex items-center gap-2 border-2 border-white/80 text-white
                       font-semibold px-6 py-3 rounded-sm text-sm uppercase tracking-wide
                       hover:border-white transition-colors"
          >
            <FileDown size={15} /> Télécharger la brochure
          </a>
        </div>
      </div>
    </section>
  );
}
