'use client';
import { Search, RotateCcw } from 'lucide-react';
import { useFilterStore } from '@/store/filterStore';

export function CraneFilters() {
  const { filters, setFilter, resetFilters } = useFilterStore();

  return (
    <div className="bg-white p-4 rounded-sm shadow-sm border border-navy/5 mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-steel" />
          <input
            type="text"
            placeholder="Rechercher un modèle ou une marque..."
            className="input-field pl-9"
            onChange={(e) => setFilter('brand', e.target.value || undefined)}
          />
        </div>

        {/* Capacité */}
        <select
          className="input-field sm:w-44"
          onChange={(e) => {
            const val = e.target.value;
            if (!val) { setFilter('capacityMin', undefined); setFilter('capacityMax', undefined); }
            else if (val === '0-100') { setFilter('capacityMin', 0); setFilter('capacityMax', 100); }
            else if (val === '100-200') { setFilter('capacityMin', 100); setFilter('capacityMax', 200); }
            else { setFilter('capacityMin', 200); setFilter('capacityMax', undefined); }
          }}
        >
          <option value="">Capacité</option>
          <option value="0-100">Jusqu'à 100T</option>
          <option value="100-200">100T — 200T</option>
          <option value="200+">200T et plus</option>
        </select>

        {/* Disponibilité */}
        <select
          className="input-field sm:w-44"
          onChange={(e) => setFilter('status', e.target.value || undefined)}
        >
          <option value="">Disponibilité</option>
          <option value="available">Disponible</option>
          <option value="reserved">Réservé</option>
          <option value="maintenance">Maintenance</option>
        </select>

        {/* Reset */}
        <button
          onClick={resetFilters}
          className="flex items-center gap-2 px-4 py-2 border border-navy/20 rounded-sm
                     text-sm text-steel hover:text-navy hover:border-navy/40 transition-colors"
        >
          <RotateCcw size={14} /> Réinitialiser
        </button>
      </div>
    </div>
  );
}
