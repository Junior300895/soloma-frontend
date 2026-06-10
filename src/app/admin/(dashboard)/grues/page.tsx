'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCranes } from '@/hooks/useCranes';
import { api } from '@/lib/api';
import { cn, STATUS_LABELS } from '@/lib/utils';
import type { Crane } from '@/types';

const statusColors: Record<string, string> = {
  available: 'bg-emerald-100 text-emerald-700',
  reserved: 'bg-amber-100 text-amber-700',
  maintenance: 'bg-red-100 text-red-700',
};

export default function AdminGruesPage() {
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<Crane | null>(null);
  const queryClient = useQueryClient();
  const { data, isLoading } = useCranes({ page, limit: 10 });
  const cranes = data?.data ?? [];
  const meta = data?.meta;

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/cranes/${id}`),
    onSuccess: () => {
      toast.success('Grue supprimée');
      setDeleteTarget(null);
      queryClient.invalidateQueries({ queryKey: ['cranes'] });
    },
    onError: () => toast.error('Erreur lors de la suppression'),
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-navy text-lg uppercase tracking-wide">
            Catalogue de Grues
          </h2>
          <p className="text-steel text-xs mt-0.5">{meta?.total ?? 0} grue(s) au total</p>
        </div>
        <Link href="/admin/grues/nouvelle" className="btn-primary text-xs py-2.5">
          <Plus size={15} /> Ajouter une grue
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-sm shadow-sm border border-navy/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F4F6F9] border-b border-navy/8">
                <th className="text-left px-4 py-3 text-xs font-semibold text-steel uppercase tracking-wider">Modèle</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-steel uppercase tracking-wider">Marque</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-steel uppercase tracking-wider">Capacité</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-steel uppercase tracking-wider">Hauteur</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-steel uppercase tracking-wider">Statut</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-steel uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-navy/5">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 bg-navy/5 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : cranes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-steel text-sm">
                    Aucune grue. <Link href="/admin/grues/nouvelle" className="text-brand-orange font-medium">En ajouter une →</Link>
                  </td>
                </tr>
              ) : (
                cranes.map((crane) => (
                  <tr key={crane.id} className="border-b border-navy/5 hover:bg-[#F4F6F9]/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-navy">{crane.model}</td>
                    <td className="px-4 py-3 text-steel">{crane.brand}</td>
                    <td className="px-4 py-3 text-steel font-mono">{crane.capacityT}T</td>
                    <td className="px-4 py-3 text-steel font-mono">{crane.maxHeightM}m</td>
                    <td className="px-4 py-3">
                      <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', statusColors[crane.status])}>
                        {STATUS_LABELS[crane.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/grues/${crane.id}`}
                          className="p-1.5 text-steel hover:text-navy hover:bg-navy/5 rounded-sm transition-colors"
                          title="Modifier"
                        >
                          <Pencil size={14} />
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(crane)}
                          className="p-1.5 text-steel hover:text-red-500 hover:bg-red-50 rounded-sm transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {meta && meta.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-navy/5">
            <span className="text-xs text-steel">
              Page {page} sur {meta.totalPages} ({meta.total} résultats)
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 text-xs border border-navy/20 rounded-sm disabled:opacity-30
                           hover:border-brand-orange hover:text-brand-orange transition-colors"
              >
                ← Préc.
              </button>
              <button
                onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
                disabled={page === meta.totalPages}
                className="px-3 py-1.5 text-xs border border-navy/20 rounded-sm disabled:opacity-30
                           hover:border-brand-orange hover:text-brand-orange transition-colors"
              >
                Suiv. →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal confirmation suppression */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-xl p-6 max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle size={18} className="text-red-500" />
              </div>
              <div>
                <h3 className="font-bold text-navy text-sm">Supprimer cette grue ?</h3>
                <p className="text-steel text-xs">{deleteTarget.brand} {deleteTarget.model}</p>
              </div>
            </div>
            <p className="text-steel text-xs mb-5">
              Cette action est irréversible. Les devis liés à cette grue seront conservés.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2 border border-navy/20 rounded-sm text-sm text-steel
                           hover:border-navy/40 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => deleteMutation.mutate(deleteTarget.id)}
                disabled={deleteMutation.isPending}
                className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white text-sm
                           font-semibold rounded-sm transition-colors disabled:opacity-60"
              >
                {deleteMutation.isPending ? 'Suppression...' : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
