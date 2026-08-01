import Link from 'next/link';
import Image from 'next/image';
import type { Crane } from '@/types';
import { STATUS_LABELS } from '@/lib/utils';
import { cn } from '@/lib/utils';

const statusColors: Record<string, string> = {
  available: 'text-emerald-600',
  reserved: 'text-amber-500',
  maintenance: 'text-red-500',
};
const dotColors: Record<string, string> = {
  available: 'bg-emerald-500',
  reserved: 'bg-amber-400',
  maintenance: 'bg-red-500',
};

interface CraneCardProps {
  crane: Crane;
}

export function CraneCard({ crane }: CraneCardProps) {
  return (
    <div className="group bg-white rounded-sm shadow-sm overflow-hidden border border-navy/8
                    hover:shadow-md hover:-translate-y-1 hover:border-brand-orange/40 transition-all duration-200">
      {/* Image */}
      <div className="relative h-44 bg-ink overflow-hidden">
        {crane.imageUrl ? (
          <Image src={crane.imageUrl} alt={`${crane.brand} ${crane.model}`} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 blueprint-grid opacity-40 flex items-center justify-center">
            <span className="readout text-[10px] text-blueprint">GRUE · {crane.capacityT} T</span>
          </div>
        )}
        {/* Capacity badge — la donnée reine */}
        <span className="absolute top-3 right-3 bg-brand-orange text-white font-display font-bold
                         text-2xl px-3 py-1 rounded-sm leading-none flex items-baseline gap-0.5">
          {crane.capacityT}<span className="font-mono text-xs font-medium">T</span>
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-display font-bold text-navy text-lg uppercase tracking-wide leading-tight mb-3">
          {crane.brand} {crane.model}
        </h3>

        {/* Specs = axes de l'abaque de charge */}
        <dl className="grid grid-cols-3 divide-x divide-navy/8 border-y border-navy/8 mb-3">
          {[
            { k: 'Capacité', v: `${crane.capacityT} T` },
            { k: 'Flèche', v: `${crane.maxHeightM} M` },
            { k: 'Rayon', v: `${crane.maxRadiusM} M` },
          ].map((s) => (
            <div key={s.k} className="px-2.5 py-2 first:pl-0">
              <dd className="font-display font-bold text-navy text-base leading-none">{s.v}</dd>
              <dt className="font-mono text-[9px] tracking-[0.14em] uppercase text-steel mt-1">{s.k}</dt>
            </div>
          ))}
        </dl>

        {/* Status */}
        <div className={cn('flex items-center gap-1.5 font-mono text-[11px] tracking-wide uppercase mb-3', statusColors[crane.status])}>
          <span className={cn('w-2 h-2 rounded-full', dotColors[crane.status])} />
          {STATUS_LABELS[crane.status]}
        </div>

        <Link
          href={`/contact?crane=${crane.id}&model=${encodeURIComponent(crane.brand + ' ' + crane.model)}`}
          className="btn-navy w-full justify-center text-xs py-2.5"
        >
          Demander un devis
        </Link>
      </div>
    </div>
  );
}
