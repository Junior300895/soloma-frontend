'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Project } from '@/types';

export function PortfolioSection() {
  const { data } = useQuery({
    queryKey: ['projects-home'],
    queryFn: async () => {
      const res = await api.get('/projects', { params: { page: 1, limit: 5 } });
      return res.data?.data as Project[];
    },
    staleTime: 1000 * 60 * 5,
  });

  const projects = data ?? [];

  return (
    <section className="bg-navy py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="section-tag">Notre portfolio</span>
          <h2 className="section-title-white mt-1">Nos Réalisations</h2>
          <p className="text-steel mt-2 text-sm max-w-lg">
            Chaque projet témoigne de notre savoir-faire et de notre engagement envers l'excellence.
          </p>
        </div>

        {projects.length === 0 ? (
          /* Skeleton pendant le chargement */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i}
                className={`bg-navy-light rounded-sm animate-pulse border border-white/5
                  ${i === 0 ? 'col-span-2 row-span-2 min-h-[200px]' : 'min-h-[96px]'}`} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
            {projects.map((project, i) => (
              <Link
                key={project.id}
                href={`/realisations/${project.id}`}
                className={`relative group bg-navy-light border border-white/5 rounded-sm
                  overflow-hidden flex items-end
                  hover:border-brand-orange/50 transition-all duration-200
                  ${i === 0 ? 'col-span-2 row-span-2 min-h-[200px]' : 'min-h-[96px]'}`}
              >
                {/* Image de fond */}
                {project.coverImage ? (
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-navy to-navy-light" />
                )}

                {/* Overlay au hover */}
                <div className="absolute inset-0 bg-navy/50 opacity-0 group-hover:opacity-100
                                transition-opacity duration-200 flex items-center justify-center">
                  <span className="text-white text-xs font-semibold tracking-wider uppercase">
                    Voir le projet →
                  </span>
                </div>

                {/* Infos */}
                <div className="relative z-10 p-3 w-full">
                  <p className="text-white font-medium text-xs leading-snug line-clamp-1">
                    {project.title}
                  </p>
                  {project.location && (
                    <p className="flex items-center gap-1 text-white/40 text-[10px] mt-0.5">
                      <MapPin size={9} />{project.location}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link href="/realisations" className="btn-outline inline-flex">
            Voir toutes les réalisations <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
