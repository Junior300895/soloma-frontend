'use client';
import { MessageCircle } from 'lucide-react';

export function WhatsAppFloat() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP || '';
  const message = encodeURIComponent(
    'Bonjour SOLOMA SUARL, je souhaite obtenir un devis pour vos services.',
  );
  const href = `https://wa.me/${number.replace('+', '')}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter sur WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366]
                 flex items-center justify-center text-white shadow-lg
                 hover:scale-110 transition-transform duration-200
                 animate-pulse-slow"
      style={{ boxShadow: '0 4px 20px rgba(37,211,102,0.4)' }}
    >
      <MessageCircle size={26} fill="white" />
    </a>
  );
}
