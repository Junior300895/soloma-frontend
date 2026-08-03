import type { Metadata } from 'next';
import { MapPin, Phone, Mail, MessageCircle, Clock } from 'lucide-react';
import { ContactPageContent } from './ContactPageContent';
import { PageHeader } from '@/components/layout/PageHeader';

export const metadata: Metadata = { title: 'Contact' };

const infos = [
  { icon: MapPin, label: 'Adresse', value: 'Dakar, Sénégal' },
  { icon: Phone, label: 'Téléphone', value: '+221 XX XXX XX XX', href: 'tel:+221XXXXXXXXX' },
  { icon: Mail, label: 'Email', value: 'contact@solomasuarl.sn', href: 'mailto:contact@solomasuarl.sn' },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Disponible 24h/24', href: '#' },
  { icon: Clock, label: 'Horaires', value: 'Lun–Sam : 8h–18h' },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nous joindre"
        title="Parlons de votre levage"
        subtitle="Décrivez votre charge et votre site. Nous revenons avec la capacité, le rayon et le planning — réponse sous 24 h."
        readout={'DAKAR · 14.68°N\nLUN–SAM 8H–18H'}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 bg-white rounded-sm shadow-sm border border-navy/8 p-8">
            <ContactPageContent />
          </div>
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-ink rounded-sm border border-blueprint/30 p-6">
              <h3 className="section-tag mb-5">Nos coordonnées</h3>
              <div className="space-y-4">
                {infos.map((info) => {
                  const Icon = info.icon;
                  return (
                    <div key={info.label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-sm bg-white/[0.03] border border-brand-orange/30
                                      flex items-center justify-center shrink-0">
                        <Icon size={16} className="text-brand-orange" />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-blueprint">{info.label}</p>
                        {info.href ? (
                          <a href={info.href} className="text-chalk text-sm hover:text-brand-orange transition-colors">{info.value}</a>
                        ) : (
                          <p className="text-chalk text-sm">{info.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative bg-ink rounded-sm h-52 border border-blueprint/30 blueprint-grid overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="readout text-[10px] text-blueprint text-center leading-relaxed">
                  Emplacement carte<br />PORT DE DAKAR · 14.68°N 17.43°W
                </span>
              </div>
              <span className="absolute top-3 left-3 w-4 h-4 border-t border-l border-brand-orange/70" />
              <span className="absolute top-3 right-3 w-4 h-4 border-t border-r border-brand-orange/70" />
              <span className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-brand-orange/70" />
              <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-brand-orange/70" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
