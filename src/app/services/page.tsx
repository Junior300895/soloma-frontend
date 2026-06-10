'use client';
import Link from 'next/link';
import { ArrowRight, Ship, Construction, Package, Wrench, LucideIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { ServicePage } from '@/types';

const iconMap: Record<string, LucideIcon> = { Ship, Construction, Package, Wrench };

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
      <div className="bg-navy pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-steel text-xs uppercase tracking-widest mb-2">Ce que nous faisons</p>
          <h1 className="font-display font-black text-white text-4xl md:text-5xl uppercase tracking-wide">
            Nos Services
          </h1>
          <p className="text-white/50 mt-3 text-sm max-w-xl">
            Une expertise complète pour répondre à tous vos besoins de manutention,
            levage et logistique industrielle.
          </p>
        </div>
      </div>

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
              return (
                <div key={s.id}
                  className="bg-white rounded-sm border-t-2 border-brand-orange p-7
                             shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-sm bg-brand-orange/10 flex items-center justify-center shrink-0">
                      <Icon size={24} className="text-brand-orange" />
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-navy text-xl uppercase tracking-wide">
                        {s.title}
                      </h2>
                      <p className="text-steel text-sm leading-relaxed mt-1">{s.description}</p>
                    </div>
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
