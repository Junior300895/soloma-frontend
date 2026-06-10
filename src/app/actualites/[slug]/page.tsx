'use client';
import { usePost } from '@/hooks/usePosts';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, Tag, ChevronRight, Share2 } from 'lucide-react';

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const { data: post, isLoading, isError } = usePost(params.slug);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 bg-[#F4F6F9]">
        <div className="max-w-3xl mx-auto px-4 py-10 space-y-4">
          <div className="h-8 bg-white rounded-sm w-3/4 animate-pulse" />
          <div className="h-4 bg-white rounded-sm animate-pulse" />
          <div className="h-64 bg-white rounded-sm animate-pulse" />
        </div>
      </div>
    );
  }

  if (isError || !post) notFound();

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      {/* Hero */}
      <div className="bg-navy pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-4">
            <Link href="/" className="hover:text-white/70 transition-colors">Accueil</Link>
            <ChevronRight size={12} />
            <Link href="/actualites" className="hover:text-white/70 transition-colors">Actualités</Link>
            <ChevronRight size={12} />
            <span className="text-white/70 line-clamp-1">{post.title}</span>
          </nav>

          {post.category && (
            <div className="inline-flex items-center gap-1.5 bg-brand-orange/20 text-brand-orange
                            text-xs font-bold tracking-[2px] uppercase px-3 py-1 rounded-sm mb-3">
              <Tag size={10} /> {post.category.name}
            </div>
          )}

          <h1 className="font-display font-black text-white text-3xl md:text-4xl uppercase tracking-wide leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-white/40 text-xs">
            <span className="flex items-center gap-1.5">
              <Calendar size={11} className="text-brand-orange" />
              {formatDate(post.publishedAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Cover image */}
      {post.coverImage && (
        <div className="relative h-64 md:h-96 bg-navy">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover opacity-80" />
        </div>
      )}

      {/* Contenu */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* Article */}
          <article className="lg:col-span-3">
            {post.excerpt && (
              <p className="text-navy font-medium text-base leading-relaxed border-l-4 border-brand-orange
                             pl-4 mb-8 bg-brand-orange/5 py-3 rounded-r-sm">
                {post.excerpt}
              </p>
            )}

            {post.content ? (
              <div
                className="prose prose-sm max-w-none text-steel leading-relaxed
                           prose-headings:text-navy prose-headings:font-display prose-headings:uppercase
                           prose-a:text-brand-orange prose-strong:text-navy"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <p className="text-steel text-sm italic">Contenu de l'article à venir.</p>
            )}

            {/* Share */}
            <div className="mt-10 pt-6 border-t border-navy/10 flex items-center gap-3">
              <Share2 size={15} className="text-steel" />
              <span className="text-xs text-steel uppercase tracking-wider font-medium">Partager</span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank" rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#1877F2] text-white text-xs font-bold rounded-sm hover:opacity-90 transition-opacity"
              >FB</a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                target="_blank" rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#1DA1F2] text-white text-xs font-bold rounded-sm hover:opacity-90 transition-opacity"
              >TW</a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + shareUrl)}`}
                target="_blank" rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#25D366] text-white text-xs font-bold rounded-sm hover:opacity-90 transition-opacity"
              >WA</a>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="bg-brand-orange rounded-sm p-5">
              <h3 className="font-display font-bold text-white text-sm uppercase tracking-wide mb-2">
                Un projet ?
              </h3>
              <p className="text-white/80 text-xs mb-4">
                Notre équipe est disponible pour discuter de vos besoins.
              </p>
              <Link href="/contact" className="block bg-white text-brand-orange font-bold text-xs uppercase
                                               tracking-wider text-center py-2.5 rounded-sm hover:bg-[#F4F6F9] transition-colors">
                Nous contacter
              </Link>
            </div>

            <div className="bg-white rounded-sm p-5 shadow-sm border border-navy/5">
              <h3 className="font-semibold text-navy text-xs uppercase tracking-wider mb-3">Nos Services</h3>
              {['Manutention Portuaire', 'Levage Industriel', 'Logistique'].map((s) => (
                <Link key={s} href="/services" className="flex items-center justify-between py-2
                                                           border-b border-navy/5 last:border-0
                                                           text-sm text-steel hover:text-brand-orange transition-colors">
                  {s} <ChevronRight size={12} />
                </Link>
              ))}
            </div>

            <Link href="/actualites" className="flex items-center justify-center gap-2 border border-navy/20
                                                 rounded-sm py-3 text-sm text-steel hover:border-brand-orange
                                                 hover:text-brand-orange transition-colors">
              ← Toutes les actualités
            </Link>
          </aside>
        </div>
      </div>
    </>
  );
}
