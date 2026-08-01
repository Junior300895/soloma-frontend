'use client';
import { Bell, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const titles: Record<string, string> = {
  '/admin': 'Tableau de bord',
  '/admin/grues': 'Gestion des grues',
  '/admin/devis': 'Demandes de devis',
  '/admin/projets': 'Gestion des projets',
  '/admin/services': 'Services',
  '/admin/messages': 'Messages',
  '/admin/blog': 'Blog & actualités',
};

export function AdminTopbar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const title = Object.entries(titles)
    .reverse()
    .find(([key]) => pathname.startsWith(key))?.[1] ?? 'Admin';

  return (
    <header className="h-14 bg-white border-b border-navy/8 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline w-4 h-px bg-brand-orange/70" aria-hidden />
        <h1 className="font-display font-bold text-navy text-lg uppercase tracking-wide leading-none">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 text-steel hover:text-navy transition-colors" aria-label="Notifications">
          <Bell size={18} />
        </button>
        <div className="w-8 h-8 rounded-sm bg-brand-orange flex items-center justify-center
                        text-white font-display font-bold text-sm">
          {user?.name?.[0]?.toUpperCase() ?? 'A'}
        </div>
      </div>
    </header>
  );
}
