'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { formatDate, cn } from '@/lib/utils';
import { Plus, Globe, FileEdit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const statusStyle: Record<string, string> = {
  published: 'bg-emerald-100 text-emerald-700',
  draft: 'bg-amber-100 text-amber-700',
  archived: 'bg-gray-100 text-gray-500',
};
const statusLabel: Record<string, string> = {
  published: 'Publié', draft: 'Brouillon', archived: 'Archivé',
};

export default function AdminBlogPage() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-posts', page],
    queryFn: async () => {
      const res = await api.get('/posts', { params: { page, limit: 12 } });
      return res.data;
    },
  });

  const posts = data?.data ?? [];
  const meta = data?.meta;

  const publishMutation = useMutation({
    mutationFn: (id: number) => api.patch(`/posts/${id}/publish`),
    onSuccess: () => { toast.success('Article publié !'); queryClient.invalidateQueries({ queryKey: ['admin-posts'] }); },
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-navy text-lg uppercase tracking-wide">Blog & Actualités</h2>
          <p className="text-steel text-xs mt-0.5">{meta?.total ?? 0} article(s)</p>
        </div>
        <Link href="/admin/blog/nouveau" className="btn-primary text-xs py-2.5">
          <Plus size={15} /> Nouvel article
        </Link>
      </div>

      <div className="bg-white rounded-sm shadow-sm border border-navy/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F4F6F9] border-b border-navy/8">
              {['Titre', 'Catégorie', 'Statut', 'Date', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-steel uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-navy/5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <td key={j} className="px-4 py-3"><div className="h-4 bg-navy/5 rounded animate-pulse" /></td>
                  ))}
                </tr>
              ))
            ) : posts.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-12 text-steel">
                Aucun article. <Link href="/admin/blog/nouveau" className="text-brand-orange font-medium">En créer un →</Link>
              </td></tr>
            ) : (
              posts.map((post: any) => (
                <tr key={post.id} className="border-b border-navy/5 hover:bg-[#F4F6F9]/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-navy max-w-xs truncate">{post.title}</td>
                  <td className="px-4 py-3 text-steel text-xs">{post.category?.name || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', statusStyle[post.status])}>
                      {statusLabel[post.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-steel text-xs">{formatDate(post.publishedAt || post.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {post.status === 'draft' && (
                        <button onClick={() => publishMutation.mutate(post.id)}
                          className="p-1.5 text-steel hover:text-emerald-600 hover:bg-emerald-50 rounded-sm transition-colors"
                          title="Publier">
                          <Globe size={14} />
                        </button>
                      )}
                      <Link href={`/actualites/${post.slug}`} target="_blank"
                        className="p-1.5 text-steel hover:text-navy hover:bg-navy/5 rounded-sm transition-colors"
                        title="Voir l'article">
                        <FileEdit size={14} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
