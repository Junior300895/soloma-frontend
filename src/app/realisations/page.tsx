'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import { formatDate } from '@/lib/utils';

export default function RealisationsPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useProjects(page, 9);
  const projects = data?.data ?? [];
  const meta = data?.meta;

  return (
    <>
      <div className="bg-navy pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-steel text-xs uppercase tracking-widest mb-2">Portfolio</p>
          <h1 className="font-display font-black text-white text-4xl md:text-5xl uppercase tracking-wide">
            Nos Réalisations
          </h1>
          <p className="text-white/50 mt-3 text-sm">
            {meta?.total ?? '—'} projet(s) réalisé(s)
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-sm h-72 animate-pulse" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <p className="text-center text-steel py-16">Aucun projet disponible.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {projects.map((project) => (
                <Link key={project.id} href={`/realisations/${project.id}`}
                  className="bg-white rounded-sm shadow-sm overflow-hidden border border-navy/5
                             hover:shadow-md hover:-translate-y-1 transition-all duration-200 group">
                  {/* Image */}
                  <div className="relative h-48 bg-navy overflow-hidden">
                    {project.coverImage ? (
                      <Image src={project.coverImage} alt={project.title} fill
                        className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white/10 text-5xl">📸</span>
                      </div>
                    )}
                    {/* Nombre de médias */}
                    {project.media && project.media.length > 0 && (
                      <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px]
                                       px-2 py-0.5 rounded-sm">
                        {project.media.length} média{project.media.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  {/* Infos */}
                  <div className="p-5">
                    <h3 className="font-semibold text-navy text-sm leading-snug mb-2
                                   group-hover:text-brand-orange transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    {project.client && (
                      <p className="text-brand-orange text-xs font-medium mb-1">{project.client}</p>
                    )}
                    <div className="flex items-center gap-4 text-[11px] text-steel flex-wrap">
                      {project.location && (
                        <span className="flex items-center gap-1">
                          <MapPin size={11} />{project.location}
                        </span>
                      )}
                      {project.completedAt && (
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />{formatDate(project.completedAt)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {meta && meta.totalPages > 1 && (
              <div className="flex items-center justify-center gap-3">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="p-2 border border-navy/20 rounded-sm disabled:opacity-30
                             hover:border-brand-orange hover:text-brand-orange transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <span className="text-sm text-steel">Page {page} / {meta.totalPages}</span>
                <button onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))} disabled={page === meta.totalPages}
                  className="p-2 border border-navy/20 rounded-sm disabled:opacity-30
                             hover:border-brand-orange hover:text-brand-orange transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
