'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import { formatDate } from '@/lib/utils';
import { PageHeader } from '@/components/layout/PageHeader';

export default function RealisationsPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useProjects(page, 9);
  const projects = data?.data ?? [];
  const meta = data?.meta;

  return (
    <>
      <PageHeader
        eyebrow="Dossier de réalisations"
        title="Ce que nous avons levé"
        subtitle="Des charges que peu d'acteurs de la région acceptent de manœuvrer, exécutées sur les quais et les chantiers d'Afrique de l'Ouest."
        readout={meta?.total ? `${meta.total} PROJETS\nARCHIVÉS` : undefined}
      />

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
                  className="bg-white rounded-sm shadow-sm overflow-hidden border border-navy/8
                             hover:shadow-md hover:-translate-y-1 hover:border-brand-orange/40
                             transition-all duration-200 group">
                  {/* Image */}
                  <div className="relative h-48 bg-ink overflow-hidden">
                    {project.coverImage ? (
                      <Image src={project.coverImage} alt={project.title} fill
                        className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="absolute inset-0 blueprint-grid opacity-40 flex items-center justify-center">
                        <span className="readout text-[10px] text-blueprint">SOLOMA · RÉALISATION</span>
                      </div>
                    )}
                    {/* Nombre de médias */}
                    {project.media && project.media.length > 0 && (
                      <span className="absolute bottom-2 right-2 bg-ink/70 border border-white/15
                                       text-chalk font-mono text-[10px] tracking-wider px-2 py-0.5 rounded-sm">
                        {project.media.length} média{project.media.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  {/* Infos */}
                  <div className="p-5">
                    {project.client && (
                      <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-brand-orange mb-1.5">
                        {project.client}
                      </p>
                    )}
                    <h3 className="font-display font-bold text-navy text-lg uppercase tracking-wide leading-tight mb-2.5
                                   group-hover:text-brand-orange transition-colors line-clamp-2">
                      {project.title}
                    </h3>
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
