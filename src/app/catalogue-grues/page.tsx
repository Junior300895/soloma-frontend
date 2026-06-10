'use client';
import { CraneFilters } from '@/components/cranes/CraneFilters';
import { CraneCard } from '@/components/cranes/CraneCard';
import { useCranes } from '@/hooks/useCranes';
import { useFilterStore } from '@/store/filterStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CatalogPage() {
  const { filters, setFilter } = useFilterStore();
  const { data, isLoading, isError } = useCranes(filters);
  const cranes = data?.data ?? [];
  const meta = data?.meta;

  return (
    <>
      <div className="bg-navy pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-steel text-xs uppercase tracking-widest mb-2">Notre flotte</p>
          <h1 className="font-display font-black text-white text-4xl md:text-5xl uppercase tracking-wide">
            Catalogue de Grues
          </h1>
          <p className="text-white/50 mt-3 text-sm">
            {meta?.total ?? '—'} équipement(s) disponible(s)
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <CraneFilters />

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-sm h-72 animate-pulse" />
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center py-16 text-steel">
            Impossible de charger le catalogue. Veuillez réessayer.
          </div>
        )}

        {!isLoading && !isError && cranes.length === 0 && (
          <div className="text-center py-16 text-steel">
            Aucune grue ne correspond à vos critères.
          </div>
        )}

        {!isLoading && !isError && cranes.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {cranes.map((crane) => <CraneCard key={crane.id} crane={crane} />)}
            </div>

            {meta && meta.totalPages > 1 && (
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setFilter('page', Math.max(1, (filters.page ?? 1) - 1))}
                  disabled={filters.page === 1}
                  className="p-2 border border-navy/20 rounded-sm disabled:opacity-30
                             hover:border-brand-orange hover:text-brand-orange transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <span className="text-sm text-steel">
                  Page {filters.page ?? 1} / {meta.totalPages}
                </span>
                <button
                  onClick={() => setFilter('page', Math.min(meta.totalPages, (filters.page ?? 1) + 1))}
                  disabled={filters.page === meta.totalPages}
                  className="p-2 border border-navy/20 rounded-sm disabled:opacity-30
                             hover:border-brand-orange hover:text-brand-orange transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
