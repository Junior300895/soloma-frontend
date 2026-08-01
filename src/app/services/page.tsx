'use client';
import Link from 'next/link';
import { ArrowRight, Ship, Construction, Package, Wrench, LucideIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { PageHeader } from '@/components/layout/PageHeader';
import type { ServicePage } from '@/types';

const iconMap: Record<string, LucideIcon> = { Ship, Construction, Package, Wrench };

/* Métrique réelle par service (au lieu d'une décoration) */
const metricBySlug: Record<string, string> = {
  'manutention-portuaire': '24/7',
  'levage-industriel': '50–500 T',
  'operations-logistiques': 'GPS',
  'services-associes': 'HSE',
};

export default function ServicesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await api.get('/services');
      return res.data?.data as ServicePage[];
    },
    staleTime: 1000 * 60 * 10,
  });

  const services = data ?? [];

  return (
    <>
      <PageHeader
        eyebrow="Ce que nous faisons"
        title="Nos métiers"
        subtitle="Du quai au chantier, une seule chaîne de levage : manutention, levage, transport et suivi. Un interlocuteur, de l'étude à la dépose."
        readout={'LEVAGE 50–500 T\n24/7 · DAKAR'}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-sm h-64 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s) => {
              const Icon = iconMap[s.icon ?? ''] ?? Ship;
              const metric = metricBySlug[s.slug];
              return (
                <div key={s.id}
                  className="group bg-white rounded-sm border border-navy/8 p-7 shadow-sm
                             hover:shadow-md hover:-translate-y-1 hover:border-brand-orange/40
                             transition-all duration-200">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-sm bg-navy/[0.04] border border-navy/8
                                      flex items-center justify-center shrink-0
                                      group-hover:bg-brand-orange/10 group-hover:border-brand-orange/30 transition-colors">
                        <Icon size={24} className="text-navy group-hover:text-brand-orange transition-colors" />
                      </div>
                      <div>
                        <h2 className="font-display font-bold text-navy text-xl uppercase tracking-wide">
                          {s.title}
                        </h2>
                        <p className="text-steel text-sm leading-relaxed mt-1">{s.description}</p>
                      </div>
                    </div>
                    {metric && (
                      <span className="font-mono text-[10px] tracking-[0.14em] text-brand-orange
                                       border border-brand-orange/30 rounded-sm px-1.5 py-0.5 shrink-0">
                        {metric}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <Link href={`/services/${s.slug}`} className="btn-primary text-xs py-2.5">
                      En savoir plus <ArrowRight size={13} />
                    </Link>
                    <Link href="/contact" className="btn-navy text-xs py-2.5">
                      Demander un devis
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
