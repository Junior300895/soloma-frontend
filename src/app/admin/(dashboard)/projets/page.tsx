'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { Plus, Eye, Pencil, Trash2, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminProjetsPage() {
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-projects', page],
    queryFn: async () => {
      const res = await api.get('/projects', { params: { page, limit: 12 } });
      return res.data;
    },
  });

  const projects = data?.data ?? [];
  const meta = data?.meta;

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/projects/${id}`),
    onSuccess: () => {
      toast.success('Projet supprimé');
      setDeleteId(null);
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
    },
    onError: () => toast.error('Erreur lors de la suppression'),
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-navy text-xl uppercase tracking-wide">Projets & Réalisations</h2>
          <p className="admin-count">{meta?.total ?? 0} projet(s)</p>
        </div>
        <Link href="/admin/projets/nouveau" className="btn-primary text-xs py-2.5">
          <Plus size={15} /> Nouveau projet
        </Link>
      </div>

      <div className="bg-white rounded-sm shadow-sm border border-navy/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F4F6F9] border-b border-navy/8">
              {['Titre', 'Client', 'Localisation', 'Date', 'Médias', 'Actions'].map(h => (
                <th key={h} className="admin-th">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-navy/5">
                  {Array.from({ length: 6 }).map((_, j) => (
                    <td key={j} className="px-4 py-3"><div className="h-4 bg-navy/5 rounded animate-pulse" /></td>
                  ))}
                </tr>
              ))
            ) : projects.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-12 text-steel">
                Aucun projet. <Link href="/admin/projets/nouveau" className="text-brand-orange font-medium">En créer un →</Link>
              </td></tr>
            ) : (
              projects.map((p: any) => (
                <tr key={p.id} className="border-b border-navy/5 hover:bg-[#F4F6F9]/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-navy max-w-xs truncate">{p.title}</td>
                  <td className="px-4 py-3 text-steel text-xs">{p.client || '—'}</td>
                  <td className="px-4 py-3 text-steel text-xs">{p.location || '—'}</td>
                  <td className="px-4 py-3 text-steel text-xs">{p.completedAt ? formatDate(p.completedAt) : '—'}</td>
                  <td className="px-4 py-3 text-steel text-xs">{p.media?.length ?? 0} fichier(s)</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/realisations/${p.id}`} target="_blank"
                        className="p-1.5 text-steel hover:text-navy hover:bg-navy/5 rounded-sm transition-colors" title="Voir">
                        <Eye size={14} />
                      </Link>
                      <Link href={`/admin/projets/${p.id}/modifier`}
                        className="p-1.5 text-steel hover:text-brand-orange hover:bg-orange-50 rounded-sm transition-colors" title="Modifier">
                        <Pencil size={14} />
                      </Link>
                      <button onClick={() => setDeleteId(p.id)}
                        className="p-1.5 text-steel hover:text-red-500 hover:bg-red-50 rounded-sm transition-colors" title="Supprimer">
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

      {/* Modale suppression */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-xl p-6 max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle size={18} className="text-red-500" />
              </div>
              <h3 className="font-bold text-navy text-sm">Supprimer ce projet ?</h3>
            </div>
            <p className="text-steel text-xs mb-5">Tous les médias associés seront également supprimés.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2 border border-navy/20 rounded-sm text-sm text-steel hover:border-navy/40">Annuler</button>
              <button onClick={() => deleteMutation.mutate(deleteId)} disabled={deleteMutation.isPending}
                className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-sm disabled:opacity-60">
                {deleteMutation.isPending ? 'Suppression...' : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
