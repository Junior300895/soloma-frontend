import Link from 'next/link';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

const services = [
  { href: '/services/manutention-portuaire', label: 'Manutention Portuaire' },
  { href: '/services/levage-industriel', label: 'Levage Industriel' },
  { href: '/services/operations-logistiques', label: 'Opérations Logistiques' },
  { href: '/catalogue-grues', label: 'Catalogue de Grues' },
];

const nav = [
  { href: '/', label: 'Accueil' },
  { href: '/a-propos', label: 'À Propos' },
  { href: '/realisations', label: 'Réalisations' },
  { href: '/actualites', label: 'Actualités' },
  { href: '/contact', label: 'Contact' },
];

const socials = [
  { label: 'YT', href: '#', title: 'YouTube' },
  { label: 'FB', href: '#', title: 'Facebook' },
  { label: 'IG', href: '#', title: 'Instagram' },
  { label: 'TK', href: '#', title: 'TikTok' },
  { label: 'WA', href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || ''}`, title: 'WhatsApp' },
];

export function Footer() {
  return (
    <footer className="bg-navy border-t border-brand-orange/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="block mb-4">
              <span className="font-display font-black text-lg tracking-[3px] text-white uppercase">
                SOLOMA <span className="text-brand-orange">SUARL</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Spécialiste de la manutention portuaire et du levage industriel en Afrique de l'Ouest.
            </p>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  title={s.title}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-sm bg-white/5 hover:bg-brand-orange flex items-center justify-center
                             text-white/60 hover:text-white text-[10px] font-bold tracking-wider
                             transition-all duration-200"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-[2px] uppercase mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-white/50 hover:text-brand-orange text-sm transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-[2px] uppercase mb-4">Navigation</h4>
            <ul className="space-y-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-white/50 hover:text-brand-orange text-sm transition-colors">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-[2px] uppercase mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-white/50">
                <MapPin size={14} className="text-brand-orange mt-0.5 shrink-0" />
                <span>Dakar, Sénégal</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/50">
                <Phone size={14} className="text-brand-orange shrink-0" />
                <a href="tel:+221XXXXXXXXX" className="hover:text-brand-orange transition-colors">+221 XX XXX XX XX</a>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/50">
                <Mail size={14} className="text-brand-orange shrink-0" />
                <a href="mailto:contact@soloma.sn" className="hover:text-brand-orange transition-colors">contact@soloma.sn</a>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/50">
                <MessageCircle size={14} className="text-brand-orange shrink-0" />
                <span>WhatsApp disponible</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-xs">© {new Date().getFullYear()} SOLOMA SUARL — Tous droits réservés</p>
          <div className="flex gap-4">
            <Link href="/mentions-legales" className="text-white/30 hover:text-white/60 text-xs transition-colors">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="text-white/30 hover:text-white/60 text-xs transition-colors">
              Confidentialité
            </Link>
            <Link href="/admin/login" className="text-white/15 hover:text-white/40 text-xs transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
