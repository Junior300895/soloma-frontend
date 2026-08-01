import type { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Petit relevé technique aligné à droite (mono) */
  readout?: string;
}

/* En-tête de page = cartouche de plan technique.
   Cohérent avec le hero de l'accueil (fond ink, grille blueprint, filet hazard). */
export function PageHeader({ eyebrow, title, subtitle, readout }: PageHeaderProps) {
  return (
    <header className="relative bg-ink pt-32 pb-14 overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-[0.05]" aria-hidden />
      <div className="absolute bottom-0 inset-x-0 h-px bg-brand-orange/40" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <span className="section-tag">{eyebrow}</span>
            <h1 className="font-display font-extrabold text-chalk uppercase leading-[0.92] tracking-[0.01em] mt-3"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}>
              {title}
            </h1>
            {subtitle && (
              <p className="text-steel text-sm sm:text-[15px] leading-relaxed mt-4 max-w-xl">
                {subtitle}
              </p>
            )}
          </div>
          {readout && (
            <span className="hidden md:block readout text-[10px] text-blueprint whitespace-pre-line text-right pt-2">
              {readout}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
