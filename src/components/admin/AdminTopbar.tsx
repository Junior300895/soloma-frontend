'use client';
import { Bell, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const titles: Record<string, string> = {
  '/admin': 'Tableau de bord',
  '/admin/grues': 'Gestion des Grues',
  '/admin/devis': 'Demandes de Devis',
  '/admin/projets': 'Gestion des Projets',
  '/admin/messages': 'Messages',
  '/admin/blog': 'Blog & Actualités',
};

export function AdminTopbar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const title = Object.entries(titles)
    .reverse()
    .find(([key]) => pathname.startsWith(key))?.[1] ?? 'Admin';

  return (
    <header className="h-14 bg-white border-b border-navy/8 flex items-center justify-between px-6">
      <h1 className="font-display font-bold text-navy text-base uppercase tracking-wide">
        {title}
      </h1>
      <div className="flex items-center gap-3">
        <button className="relative p-2 text-steel hover:text-navy transition-colors">
          <Bell size={18} />
        </button>
        <div className="w-8 h-8 rounded-sm bg-brand-orange flex items-center justify-center
                        text-white font-bold text-xs">
          {user?.name?.[0]?.toUpperCase() ?? 'A'}
        </div>
      </div>
    </header>
  );
}
