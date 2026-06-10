'use client';
import { useProject } from '@/hooks/useProjects';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MapPin, Calendar, Building2, ChevronRight, Play } from 'lucide-react';
import { useState } from 'react';

export default function ProjetDetailPage({ params }: { params: { id: string } }) {
  const { data: project, isLoading, isError } = useProject(Number(params.id));
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F4F6F9] pt-32">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="h-64 bg-white rounded-sm animate-pulse mb-6" />
          <div className="h-8 bg-white rounded-sm w-1/2 animate-pulse mb-4" />
          <div className="h-4 bg-white rounded-sm animate-pulse mb-2" />
          <div className="h-4 bg-white rounded-sm w-3/4 animate-pulse" />
        </div>
      </div>
    );
  }

  if (isError || !project) notFound();

  const photos = project.media?.filter((m) => m.type === 'photo') ?? [];
  const videos = project.media?.filter((m) => m.type === 'video') ?? [];

  return (
    <>
      {/* Hero */}
      <div className="bg-navy pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-4">
            <Link href="/" className="hover:text-white/70 transition-colors">Accueil</Link>
            <ChevronRight size={12} />
            <Link href="/realisations" className="hover:text-white/70 transition-colors">Réalisations</Link>
            <ChevronRight size={12} />
            <span className="text-white/70 line-clamp-1">{project.title}</span>
          </nav>
          <h1 className="font-display font-black text-white text-3xl md:text-4xl uppercase tracking-wide mb-4">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-white/50">
            {project.location && (
              <span className="flex items-center gap-1.5"><MapPin size={13} className="text-brand-orange" />{project.location}</span>
            )}
            {project.client && (
              <span className="flex items-center gap-1.5"><Building2 size={13} className="text-brand-orange" />{project.client}</span>
            )}
            {project.completedAt && (
              <span className="flex items-center gap-1.5"><Calendar size={13} className="text-brand-orange" />{formatDate(project.completedAt)}</span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Contenu */}
          <div className="lg:col-span-2 space-y-8">

            {/* Cover */}
            {project.coverImage && (
              <div className="relative h-64 md:h-96 rounded-sm overflow-hidden">
                <Image src={project.coverImage} alt={project.title} fill className="object-cover" />
              </div>
            )}

            {/* Description */}
            {project.description && (
              <div>
                <h2 className="font-display font-bold text-navy text-xl uppercase tracking-wide mb-3">Description</h2>
                <p className="text-steel text-sm leading-relaxed">{project.description}</p>
              </div>
            )}

            {/* Résultats */}
            {project.results && (
              <div className="bg-brand-orange/8 border-l-4 border-brand-orange p-5 rounded-sm">
                <h2 className="font-display font-bold text-navy text-xl uppercase tracking-wide mb-3">Résultats Obtenus</h2>
                <p className="text-navy/80 text-sm leading-relaxed">{project.results}</p>
              </div>
            )}

            {/* Galerie photos */}
            {photos.length > 0 && (
              <div>
                <h2 className="font-display font-bold text-navy text-xl uppercase tracking-wide mb-4">Galerie Photos</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {photos.map((photo) => (
                    <button
                      key={photo.id}
                      onClick={() => setLightbox(photo.url)}
                      className="relative aspect-square rounded-sm overflow-hidden group"
                    >
                      <Image src={photo.url} alt={photo.caption || ''} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      {photo.caption && (
                        <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100
                                        transition-opacity flex items-end p-2">
                          <p className="text-white text-xs">{photo.caption}</p>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Vidéos */}
            {videos.length > 0 && (
              <div>
                <h2 className="font-display font-bold text-navy text-xl uppercase tracking-wide mb-4">Vidéos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {videos.map((video) => (
                    <div key={video.id} className="relative aspect-video bg-navy rounded-sm overflow-hidden group cursor-pointer">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-brand-orange/90 flex items-center justify-center
                                        group-hover:scale-110 transition-transform">
                          <Play size={22} className="text-white ml-1" />
                        </div>
                      </div>
                      {video.caption && (
                        <p className="absolute bottom-3 left-3 text-white/70 text-xs">{video.caption}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-white rounded-sm p-5 shadow-sm border border-navy/5">
              <h3 className="font-display font-bold text-navy text-sm uppercase tracking-wide mb-4">
                Informations du projet
              </h3>
              <dl className="space-y-3">
                {project.client && (
                  <div>
                    <dt className="text-xs text-steel uppercase tracking-wider">Client</dt>
                    <dd className="text-sm text-navy font-medium mt-0.5">{project.client}</dd>
                  </div>
                )}
                {project.location && (
                  <div>
                    <dt className="text-xs text-steel uppercase tracking-wider">Localisation</dt>
                    <dd className="text-sm text-navy font-medium mt-0.5">{project.location}</dd>
                  </div>
                )}
                {project.completedAt && (
                  <div>
                    <dt className="text-xs text-steel uppercase tracking-wider">Date de réalisation</dt>
                    <dd className="text-sm text-navy font-medium mt-0.5">{formatDate(project.completedAt)}</dd>
                  </div>
                )}
                {photos.length > 0 && (
                  <div>
                    <dt className="text-xs text-steel uppercase tracking-wider">Médias</dt>
                    <dd className="text-sm text-navy font-medium mt-0.5">{photos.length} photo{photos.length > 1 ? 's' : ''}{videos.length > 0 ? `, ${videos.length} vidéo${videos.length > 1 ? 's' : ''}` : ''}</dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="bg-brand-orange rounded-sm p-5">
              <h3 className="font-display font-bold text-white text-sm uppercase tracking-wide mb-2">
                Projet similaire ?
              </h3>
              <p className="text-white/80 text-xs mb-4">Parlons de votre prochain chantier.</p>
              <Link href="/contact" className="block bg-white text-brand-orange font-bold text-xs uppercase
                                               tracking-wider text-center py-3 rounded-sm hover:bg-[#F4F6F9] transition-colors">
                Nous contacter
              </Link>
            </div>

            <Link href="/realisations" className="flex items-center justify-center gap-2 border border-navy/20
                                                   rounded-sm py-3 text-sm text-steel hover:border-brand-orange
                                                   hover:text-brand-orange transition-colors">
              ← Toutes les réalisations
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <Image src={lightbox} alt="Photo projet" width={1200} height={800} className="object-contain max-h-[90vh] mx-auto rounded-sm" />
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20
                         flex items-center justify-center text-white text-lg transition-colors"
            >✕</button>
          </div>
        </div>
      )}
    </>
  );
}
