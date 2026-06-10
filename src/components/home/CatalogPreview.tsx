'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useCranes } from '@/hooks/useCranes';
import { CraneCard } from '@/components/cranes/CraneCard';

export function CatalogPreview() {
  const { data, isLoading } = useCranes({ limit: 3, status: 'available' });
  const cranes = data?.data ?? [];

  return (
    <section className="py-20 bg-[#F4F6F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="section-tag">Notre flotte</span>
            <h2 className="section-title mt-1">Catalogue de Grues</h2>
          </div>
          <Link href="/catalogue-grues"
            className="inline-flex items-center gap-1.5 text-brand-orange font-semibold
                       text-xs uppercase tracking-wider hover:gap-3 transition-all">
            Voir tout <ArrowRight size={14} />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-sm h-72 animate-pulse" />
            ))}
          </div>
        ) : cranes.length === 0 ? (
          <div className="text-center py-12 text-steel text-sm">
            Aucune grue disponible pour le moment.{' '}
            <Link href="/contact" className="text-brand-orange font-medium">Nous contacter →</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cranes.map((crane) => <CraneCard key={crane.id} crane={crane} />)}
          </div>
        )}
      </div>
    </section>
  );
}
