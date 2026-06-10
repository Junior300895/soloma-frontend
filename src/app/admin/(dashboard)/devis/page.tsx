'use client';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  processed: 'bg-emerald-100 text-emerald-700',
  archived: 'bg-gray-100 text-gray-500',
};
const statusLabels: Record<string, string> = {
  pending: 'En attente',
  processed: 'Traité',
  archived: 'Archivé',
};

export default function AdminDevisPage() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-quotes', page],
    queryFn: async () => {
      const res = await api.get('/quotes', { params: { page, limit: 15 } });
      return res.data;
    },
  });

  const quotes = data?.data ?? [];
  const meta = data?.meta;

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      api.patch(`/quotes/${id}/status`, { status }),
    onSuccess: () => {
      toast.success('Statut mis à jour');
      queryClient.invalidateQueries({ queryKey: ['admin-quotes'] });
    },
  });

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display font-bold text-navy text-lg uppercase tracking-wide">Demandes de Devis</h2>
        <p className="text-steel text-xs mt-0.5">{meta?.total ?? 0} demande(s) reçue(s)</p>
      </div>

      <div className="bg-white rounded-sm shadow-sm border border-navy/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F4F6F9] border-b border-navy/8">
                {['Nom', 'Email', 'Téléphone', 'Service', 'Grue', 'Date', 'Statut', 'Action'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-steel uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-b border-navy/5">
                    {Array.from({ length: 8 }).map((_, j) => (
                      <td key={j} className="px-4 py-3"><div className="h-4 bg-navy/5 rounded animate-pulse" /></td>
                    ))}
                  </tr>
                ))
              ) : quotes.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-12 text-steel">Aucune demande de devis.</td></tr>
              ) : (
                quotes.map((q: any) => (
                  <tr key={q.id} className="border-b border-navy/5 hover:bg-[#F4F6F9]/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-navy">{q.fullName}</td>
                    <td className="px-4 py-3 text-steel text-xs">{q.email}</td>
                    <td className="px-4 py-3 text-steel text-xs">{q.phone || '—'}</td>
                    <td className="px-4 py-3 text-steel text-xs capitalize">{q.serviceType}</td>
                    <td className="px-4 py-3 text-steel text-xs">{q.crane ? `${q.crane.brand} ${q.crane.model}` : '—'}</td>
                    <td className="px-4 py-3 text-steel text-xs">{formatDate(q.createdAt)}</td>
                    <td className="px-4 py-3">
                      <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', statusColors[q.status])}>
                        {statusLabels[q.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={q.status}
                        onChange={(e) => statusMutation.mutate({ id: q.id, status: e.target.value })}
                        className="text-xs border border-navy/15 rounded-sm px-2 py-1 bg-white text-navy
                                   focus:outline-none focus:border-brand-orange"
                      >
                        <option value="pending">En attente</option>
                        <option value="processed">Traité</option>
                        <option value="archived">Archiver</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {meta && meta.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-navy/5">
            <span className="text-xs text-steel">Page {page} / {meta.totalPages}</span>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="px-3 py-1.5 text-xs border border-navy/20 rounded-sm disabled:opacity-30 hover:border-brand-orange transition-colors">← Préc.</button>
              <button onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))} disabled={page === meta.totalPages}
                className="px-3 py-1.5 text-xs border border-navy/20 rounded-sm disabled:opacity-30 hover:border-brand-orange transition-colors">Suiv. →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
