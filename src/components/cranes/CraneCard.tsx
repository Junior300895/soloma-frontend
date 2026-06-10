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
    <div className="bg-white rounded-sm shadow-sm overflow-hidden border border-navy/5
                    hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      {/* Image */}
      <div className="relative h-40 bg-navy overflow-hidden">
        {crane.imageUrl ? (
          <Image src={crane.imageUrl} alt={`${crane.brand} ${crane.model}`} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/10 text-6xl">🏗️</span>
          </div>
        )}
        {/* Capacity badge */}
        <span className="absolute top-3 right-3 bg-brand-orange text-white font-display font-bold
                         text-xl px-3 py-1 rounded-sm leading-none">
          {crane.capacityT}T
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-navy text-sm mb-2">
          {crane.brand} {crane.model}
        </h3>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-[11px] bg-[#F4F6F9] text-steel px-2 py-0.5 rounded-sm">
            {crane.capacityT} Tonnes
          </span>
          <span className="text-[11px] bg-[#F4F6F9] text-steel px-2 py-0.5 rounded-sm">
            H: {crane.maxHeightM}m
          </span>
          <span className="text-[11px] bg-[#F4F6F9] text-steel px-2 py-0.5 rounded-sm">
            R: {crane.maxRadiusM}m
          </span>
        </div>

        {/* Status */}
        <div className={cn('flex items-center gap-1.5 text-xs font-medium mb-3', statusColors[crane.status])}>
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
