'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/services', label: 'Services' },
  { href: '/catalogue-grues', label: 'Catalogue Grues' },
  { href: '/realisations', label: 'Réalisations' },
  { href: '/a-propos', label: 'À Propos' },
  { href: '/actualites', label: 'Actualités' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b bg-white',
        scrolled ? 'shadow-md border-navy/10' : 'border-navy/8',
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="SOLOMA SUARL — Accueil">
            <Logo heightClass="h-9" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative font-mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-200 py-1',
                  pathname === link.href
                    ? 'text-brand-orange'
                    : 'text-navy/60 hover:text-navy',
                )}
              >
                {pathname === link.href && (
                  <span className="absolute -top-0.5 left-0 w-3 h-px bg-brand-orange" />
                )}
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + burger */}
          <div className="flex items-center gap-3">
            <Link href="/contact" className="hidden sm:flex btn-primary text-xs py-2 px-4">
              <Phone size={14} />
              Demander un devis
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-navy p-2"
              aria-label="Menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-navy/8">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'font-mono text-[13px] uppercase tracking-[0.12em] py-2.5 border-b border-navy/5',
                  pathname === link.href ? 'text-brand-orange' : 'text-navy/70',
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary mt-2 justify-center">
              Demander un devis
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
