'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-navy shadow-lg border-b border-brand-orange/30'
          : 'bg-navy/95 backdrop-blur-sm',
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display font-black text-xl tracking-[3px] text-white uppercase">
              SOLOMA <span className="text-brand-orange">SUARL</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-xs font-medium tracking-wider uppercase transition-colors duration-200',
                  pathname === link.href
                    ? 'text-brand-orange'
                    : 'text-white/75 hover:text-white',
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + burger */}
          <div className="flex items-center gap-3">
            <Link href="/contact" className="hidden sm:flex btn-primary text-xs py-2 px-4">
              <Phone size={14} />
              Devis Rapide
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-white p-2"
              aria-label="Menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-navy border-t border-white/10">
          <div className="px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'text-sm font-medium uppercase tracking-wider py-2 border-b border-white/5',
                  pathname === link.href ? 'text-brand-orange' : 'text-white/80',
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
