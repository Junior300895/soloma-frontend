'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import type { Post } from '@/types';

export function BlogPreview() {
  const { data } = useQuery({
    queryKey: ['posts-home'],
    queryFn: async () => {
      const res = await api.get('/posts', { params: { page: 1, limit: 3 } });
      return res.data?.data as Post[];
    },
    staleTime: 1000 * 60 * 5,
  });

  const posts = data ?? [];

  return (
    <section className="py-20 bg-[#F4F6F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="section-tag">Actualités</span>
            <h2 className="section-title mt-3">Du chantier & des quais</h2>
          </div>
          <Link href="/actualites"
            className="inline-flex items-center gap-1.5 text-brand-orange font-semibold
                       text-xs uppercase tracking-wider hover:gap-3 transition-all">
            Voir tout <ArrowRight size={14} />
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-sm shadow-sm h-64 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/actualites/${post.slug}`}
                className="bg-white rounded-sm shadow-sm border border-navy/8
                           hover:shadow-md hover:-translate-y-1 hover:border-brand-orange/40
                           transition-all duration-200 group">
                {/* Cover */}
                <div className="relative h-40 bg-ink rounded-t-sm overflow-hidden">
                  {post.coverImage ? (
                    <Image src={post.coverImage} alt={post.title} fill
                      className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="absolute inset-0 blueprint-grid opacity-40 flex items-center justify-center">
                      <span className="readout text-[10px] text-blueprint">SOLOMA · ACTUALITÉ</span>
                    </div>
                  )}
                </div>
                {/* Body */}
                <div className="p-5">
                  {post.category && (
                    <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-brand-orange">
                      {post.category.name}
                    </span>
                  )}
                  <h3 className="font-display font-bold text-navy text-lg uppercase tracking-wide leading-tight mt-1.5 mb-2
                                 group-hover:text-brand-orange transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-steel text-xs leading-relaxed line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-1.5 text-steel text-[11px]">
                    <Calendar size={11} />
                    {formatDate(post.publishedAt)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
