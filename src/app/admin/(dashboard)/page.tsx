'use client';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Construction, FileText, FolderOpen, Mail, TrendingUp, Clock } from 'lucide-react';
import Link from 'next/link';

function useAdminStats() {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [cranes, quotes, projects, messages] = await Promise.allSettled([
        api.get('/cranes?limit=1'),
        api.get('/quotes?limit=1'),
        api.get('/projects?limit=1'),
        api.get('/contact?limit=1'),
      ]);
      return {
        cranes: cranes.status === 'fulfilled' ? cranes.value.data?.meta?.total ?? 0 : 0,
        quotes: quotes.status === 'fulfilled' ? quotes.value.data?.meta?.total ?? 0 : 0,
        projects: projects.status === 'fulfilled' ? projects.value.data?.meta?.total ?? 0 : 0,
        messages: messages.status === 'fulfilled' ? messages.value.data?.meta?.total ?? 0 : 0,
      };
    },
  });
}

export default function DashboardPage() {
  const { data: stats, isLoading } = useAdminStats();

  const cards = [
    { label: 'Grues au catalogue', value: stats?.cranes, icon: Construction, href: '/admin/grues' },
    { label: 'Devis reçus', value: stats?.quotes, icon: FileText, href: '/admin/devis' },
    { label: 'Projets publiés', value: stats?.projects, icon: FolderOpen, href: '/admin/projets' },
    { label: 'Messages', value: stats?.messages, icon: Mail, href: '/admin/messages' },
  ];

  const quickActions = [
    { label: 'Ajouter une grue', href: '/admin/grues/nouvelle', icon: Construction },
    { label: 'Nouveau projet', href: '/admin/projets/nouveau', icon: FolderOpen },
    { label: 'Nouvel article', href: '/admin/blog/nouveau', icon: TrendingUp },
    { label: 'Voir les devis', href: '/admin/devis', icon: Clock },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group bg-white rounded-sm p-5 shadow-sm border border-navy/8
                         hover:shadow-md hover:-translate-y-0.5 hover:border-brand-orange/40 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-sm bg-navy/[0.04] border border-navy/8 flex items-center justify-center
                                group-hover:bg-brand-orange/10 group-hover:border-brand-orange/30 transition-colors">
                  <Icon size={18} className="text-navy group-hover:text-brand-orange transition-colors" />
                </div>
              </div>
              <div className="font-display font-extrabold text-navy text-4xl leading-none mb-1.5">
                {isLoading ? (
                  <div className="h-8 w-12 bg-navy/10 rounded animate-pulse" />
                ) : card.value ?? 0}
              </div>
              <p className="font-mono text-[10px] text-steel uppercase tracking-[0.14em]">{card.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Actions rapides */}
        <div className="bg-white rounded-sm shadow-sm border border-navy/8 p-5">
          <h2 className="section-tag mb-4 !text-navy/70">
            Actions rapides
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 p-3 border border-navy/8 rounded-sm
                             hover:border-brand-orange hover:bg-brand-orange/5
                             text-sm text-navy/70 hover:text-brand-orange transition-all"
                >
                  <Icon size={16} className="shrink-0" />
                  <span className="font-medium text-xs leading-tight">{action.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Infos système */}
        <div className="bg-white rounded-sm shadow-sm border border-navy/8 p-5">
          <h2 className="section-tag mb-4 !text-navy/70">
            Informations
          </h2>
          <div className="space-y-3">
            {[
              { label: 'API Backend', value: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/v1' },
              { label: 'Environnement', value: process.env.NODE_ENV || 'development' },
              { label: 'Version', value: '1.0.0' },
            ].map((info) => (
              <div key={info.label} className="flex items-center justify-between py-2 border-b border-navy/5 last:border-0">
                <span className="font-mono text-[10px] text-steel uppercase tracking-[0.14em]">{info.label}</span>
                <span className="text-xs text-navy font-medium font-mono truncate max-w-[200px]">{info.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
