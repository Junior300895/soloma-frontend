import type { Metadata } from 'next';
import { MapPin, Phone, Mail, MessageCircle, Clock } from 'lucide-react';
import { ContactPageContent } from './ContactPageContent';

export const metadata: Metadata = { title: 'Contact' };

const infos = [
  { icon: MapPin, label: 'Adresse', value: 'Dakar, Sénégal' },
  { icon: Phone, label: 'Téléphone', value: '+221 XX XXX XX XX', href: 'tel:+221XXXXXXXXX' },
  { icon: Mail, label: 'Email', value: 'contact@soloma.sn', href: 'mailto:contact@soloma.sn' },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Disponible 24h/24', href: '#' },
  { icon: Clock, label: 'Horaires', value: 'Lun–Sam : 8h–18h' },
];

export default function ContactPage() {
  return (
    <>
      <div className="bg-navy pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-steel text-xs uppercase tracking-widest mb-2">Nous joindre</p>
          <h1 className="font-display font-black text-white text-4xl md:text-5xl uppercase tracking-wide">
            Contact
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 bg-white rounded-sm shadow-sm border border-navy/5 p-8">
            <ContactPageContent />
          </div>
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-navy rounded-sm p-6">
              <h3 className="font-display font-bold text-white uppercase tracking-wide mb-5">Nos Coordonnées</h3>
              <div className="space-y-4">
                {infos.map((info) => {
                  const Icon = info.icon;
                  return (
                    <div key={info.label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-sm bg-brand-orange/20 flex items-center justify-center shrink-0">
                        <Icon size={16} className="text-brand-orange" />
                      </div>
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-wider">{info.label}</p>
                        {info.href ? (
                          <a href={info.href} className="text-white text-sm hover:text-brand-orange transition-colors">{info.value}</a>
                        ) : (
                          <p className="text-white text-sm">{info.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-navy rounded-sm h-52 flex items-center justify-center border border-white/5">
              <p className="text-white/20 text-xs tracking-wider uppercase text-center">🗺️<br />Google Maps<br />à intégrer</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
