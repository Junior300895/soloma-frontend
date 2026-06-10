'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePosts, usePostCategories } from '@/hooks/usePosts';
import { formatDate } from '@/lib/utils';

export default function ActualitesPage() {
  const [page, setPage] = useState(1);
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const { data, isLoading } = usePosts(page, 9, categoryId);
  const { data: categories } = usePostCategories();
  const posts = data?.data ?? [];
  const meta = data?.meta;

  const handleCategory = (id?: number) => {
    setCategoryId(id);
    setPage(1);
  };

  return (
    <>
      <div className="bg-navy pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-steel text-xs uppercase tracking-widest mb-2">Blog</p>
          <h1 className="font-display font-black text-white text-4xl md:text-5xl uppercase tracking-wide">
            Actualités
          </h1>
          <p className="text-white/50 mt-3 text-sm">
            {meta?.total ?? '—'} article(s) publié(s)
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filtres catégories */}
        {categories && categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button onClick={() => handleCategory(undefined)}
              className={`px-4 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors
                         ${!categoryId ? 'bg-brand-orange text-white' : 'border border-navy/20 text-steel hover:border-brand-orange hover:text-brand-orange'}`}>
              Tous
            </button>
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => handleCategory(cat.id)}
                className={`px-4 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors
                           ${categoryId === cat.id ? 'bg-brand-orange text-white' : 'border border-navy/20 text-steel hover:border-brand-orange hover:text-brand-orange'}`}>
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-sm h-64 animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-steel py-16">Aucun article disponible.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/actualites/${post.slug}`}
                  className="bg-white rounded-sm shadow-sm border border-navy/5
                             hover:shadow-md hover:-translate-y-1 transition-all duration-200 group">
                  <div className="relative h-44 bg-navy rounded-t-sm overflow-hidden">
                    {post.coverImage ? (
                      <Image src={post.coverImage} alt={post.title} fill
                        className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white/10 text-4xl">📰</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    {post.category && (
                      <span className="text-brand-orange text-[10px] font-bold tracking-[2px] uppercase">
                        {post.category.name}
                      </span>
                    )}
                    <h2 className="font-semibold text-navy text-sm leading-snug mt-1 mb-2
                                   group-hover:text-brand-orange transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-steel text-xs leading-relaxed line-clamp-2 mb-3">{post.excerpt}</p>
                    )}
                    <div className="flex items-center gap-1.5 text-steel text-[11px]">
                      <Calendar size={11} />{formatDate(post.publishedAt)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

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
