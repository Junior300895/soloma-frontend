'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Construction, FileText,
  FolderOpen, Mail, Newspaper, LogOut, ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard, exact: true },
  { href: '/admin/grues', label: 'Grues', icon: Construction },
  { href: '/admin/devis', label: 'Devis', icon: FileText },
  { href: '/admin/projets', label: 'Projets', icon: FolderOpen },
  { href: '/admin/messages', label: 'Messages', icon: Mail },
  { href: '/admin/blog', label: 'Blog', icon: Newspaper },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <aside className="w-60 min-h-screen bg-navy border-r border-white/8 flex flex-col">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/8">
        <span className="font-display font-black text-white text-base tracking-[2px] uppercase">
          SOLOMA <span className="text-brand-orange">ADMIN</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-all',
                active
                  ? 'bg-brand-orange text-white'
                  : 'text-white/55 hover:text-white hover:bg-white/5',
              )}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer sidebar */}
      <div className="px-3 py-4 border-t border-white/8 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm
                     text-white/40 hover:text-white hover:bg-white/5 transition-all"
        >
          <ExternalLink size={15} /> Voir le site
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm
                     text-white/40 hover:text-red-400 hover:bg-white/5 transition-all"
        >
          <LogOut size={15} /> Déconnexion
        </button>

        {/* User info */}
        {user && (
          <div className="mt-3 px-3 py-2.5 bg-white/5 rounded-sm">
            <p className="text-white text-xs font-semibold truncate">{user.name}</p>
            <p className="text-white/35 text-[11px] truncate">{user.email}</p>
          </div>
        )}
      </div>
    </aside>
  );
}
