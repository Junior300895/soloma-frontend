'use client';
import Link from 'next/link';
import { Ship, Construction, Package, Wrench, ArrowRight, LucideIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { ServicePage } from '@/types';

const iconMap: Record<string, LucideIcon> = {
  Ship, Construction, Package, Wrench,
};

const fallback = [
  { id: 1, slug: 'manutention-portuaire', title: 'Manutention Portuaire', icon: 'Ship', metric: '24/7',
    description: 'Chargement, déchargement et transit de marchandises 24h/24, 7j/7.',
    features: ['Opérations 24h/24, 7j/7', 'Gestion de conteneurs', 'Stockage sécurisé', 'Personnel certifié'] },
  { id: 2, slug: 'levage-industriel', title: 'Levage Industriel', icon: 'Construction', metric: '50–500 T',
    description: 'Location de grues mobiles et levage complexe de 50T à 500T.',
    features: ['Grues de 50T à 500T', 'Techniciens certifiés', 'Montage / démontage', 'Études de levage'] },
  { id: 3, slug: 'operations-logistiques', title: 'Opérations Logistiques', icon: 'Package', metric: 'GPS',
    description: 'Coordination multimodale et transport terrestre avec suivi GPS en temps réel.',
    features: ['Transport terrestre', 'Entreposage sécurisé', 'Suivi GPS temps réel', 'Dédouanement'] },
  { id: 4, slug: 'services-associes', title: 'Services Associés', icon: 'Wrench', metric: 'HSE',
    description: 'Conseil technique, inspection qualité et formation des équipes.',
    features: ['Conseil technique', 'Inspection qualité', 'Formation', 'Maintenance'] },
];

export function ServicesSection() {
  const { data } = useQuery({
    queryKey: ['services-home'],
    queryFn: async () => {
      const res = await api.get('/services');
      return res.data?.data as ServicePage[];
    },
    staleTime: 1000 * 60 * 10,
  });

  const items = (data && data.length > 0 ? data : fallback).slice(0, 4);

  return (
    <section className="py-20 bg-[#F4F6F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="section-tag">Ce que nous faisons</span>
          <h2 className="section-title mt-3 mb-3">
            Quatre métiers,<br />une seule chaîne de levage
          </h2>
          <p className="text-steel max-w-xl text-[15px] leading-relaxed">
            Du quai au chantier, nous tenons chaque maillon : manutention, levage,
            transport et suivi. Un seul interlocuteur, de l'étude à la dépose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((s: any) => {
            const Icon = iconMap[s.icon] ?? Ship;
            const features: string[] = s.features ?? [];
            return (
              <div key={s.id}
                className="group bg-white rounded-sm border border-navy/8 p-5 shadow-sm
                           hover:shadow-md hover:-translate-y-1 hover:border-brand-orange/40
                           transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-sm bg-navy/[0.04] border border-navy/8
                                  flex items-center justify-center group-hover:bg-brand-orange/10
                                  group-hover:border-brand-orange/30 transition-colors">
                    <Icon size={20} className="text-navy group-hover:text-brand-orange transition-colors" />
                  </div>
                  {s.metric && (
                    <span className="font-mono text-[10px] tracking-[0.14em] text-brand-orange
                                     border border-brand-orange/30 rounded-sm px-1.5 py-0.5">
                      {s.metric}
                    </span>
                  )}
                </div>
                <h3 className="font-display font-bold text-navy text-lg uppercase tracking-wide mb-2">
                  {s.title}
                </h3>
                <p className="text-steel text-xs leading-relaxed mb-3">{s.description}</p>
                {features.length > 0 && (
                  <ul className="space-y-1 mb-4">
                    {features.slice(0, 3).map((f: string) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-navy/75">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                )}
                <Link href={`/services/${s.slug}`}
                  className="inline-flex items-center gap-1 text-brand-orange font-semibold text-xs
                             uppercase tracking-wider hover:gap-2 transition-all">
                  En savoir plus <ArrowRight size={12} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
