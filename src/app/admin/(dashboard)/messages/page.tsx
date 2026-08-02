'use client';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { formatDate, cn } from '@/lib/utils';
import { Mail, MailOpen, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminMessagesPage() {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<any | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-messages', page],
    queryFn: async () => {
      const res = await api.get('/contact', { params: { page, limit: 15 } });
      return res.data;
    },
  });

  const messages = data?.data ?? [];
  const meta = data?.meta;

  const readMutation = useMutation({
    mutationFn: (id: number) => api.patch(`/contact/${id}/read`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-messages'] }),
  });

  const openMessage = (msg: any) => {
    setSelected(msg);
    if (!msg.isRead) readMutation.mutate(msg.id);
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display font-bold text-navy text-xl uppercase tracking-wide">Messages</h2>
        <p className="admin-count">{meta?.total ?? 0} message(s)</p>
      </div>

      <div className="bg-white rounded-sm shadow-sm border border-navy/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F4F6F9] border-b border-navy/8">
              {['', 'Nom', 'Email', 'Sujet', 'Date'].map(h => (
                <th key={h} className="admin-th">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="border-b border-navy/5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <td key={j} className="px-4 py-3"><div className="h-4 bg-navy/5 rounded animate-pulse" /></td>
                  ))}
                </tr>
              ))
            ) : messages.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-12 text-steel">Aucun message.</td></tr>
            ) : (
              messages.map((msg: any) => (
                <tr
                  key={msg.id}
                  onClick={() => openMessage(msg)}
                  className={cn(
                    'border-b border-navy/5 cursor-pointer hover:bg-[#F4F6F9]/70 transition-colors',
                    !msg.isRead && 'bg-brand-orange/3',
                  )}
                >
                  <td className="px-4 py-3 w-8">
                    {msg.isRead
                      ? <MailOpen size={14} className="text-steel" />
                      : <Mail size={14} className="text-brand-orange" />}
                  </td>
                  <td className={cn('px-4 py-3', !msg.isRead ? 'font-semibold text-navy' : 'text-navy/70')}>{msg.fullName}</td>
                  <td className="px-4 py-3 text-steel text-xs">{msg.email}</td>
                  <td className={cn('px-4 py-3 text-sm', !msg.isRead ? 'font-medium text-navy' : 'text-steel')}>
                    {msg.subject || '(Sans sujet)'}
                  </td>
                  <td className="px-4 py-3 text-steel text-xs">{formatDate(msg.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {meta && meta.totalPages > 1 && (
          <div className="flex justify-between items-center px-4 py-3 border-t border-navy/5">
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

      {/* Modal message */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between px-5 py-4 border-b border-navy/8">
              <h3 className="font-bold text-navy text-sm">{selected.subject || '(Sans sujet)'}</h3>
              <button onClick={() => setSelected(null)} className="text-steel hover:text-navy transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div><span className="font-mono text-[10px] text-steel uppercase tracking-[0.12em]">De : </span><span className="text-navy font-medium">{selected.fullName}</span></div>
                <div><span className="font-mono text-[10px] text-steel uppercase tracking-[0.12em]">Email : </span><a href={`mailto:${selected.email}`} className="text-brand-orange">{selected.email}</a></div>
                {selected.phone && <div><span className="font-mono text-[10px] text-steel uppercase tracking-[0.12em]">Tél : </span><span className="text-navy">{selected.phone}</span></div>}
                <div><span className="font-mono text-[10px] text-steel uppercase tracking-[0.12em]">Date : </span><span className="text-navy">{formatDate(selected.createdAt)}</span></div>
              </div>
              <div className="bg-[#F4F6F9] rounded-sm p-4 text-sm text-navy/80 leading-relaxed">
                {selected.message}
              </div>
            </div>
            <div className="px-5 py-4 border-t border-navy/8 flex justify-between">
              <a href={`mailto:${selected.email}?subject=RE: ${selected.subject || 'Votre message'}`}
                className="btn-primary text-xs py-2">Répondre par email</a>
              <button onClick={() => setSelected(null)}
                className="px-4 py-2 border border-navy/20 rounded-sm text-xs text-steel hover:border-navy/40 transition-colors">
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
