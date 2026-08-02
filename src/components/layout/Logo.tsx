import { cn } from '@/lib/utils';

interface LogoProps {
  /** Sur fond sombre : utilise la version blanche du logo (marine → blanc, rouge conservé) */
  onDark?: boolean;
  /** Hauteur du logo en classes Tailwind (défaut h-9) */
  heightClass?: string;
  className?: string;
}

/* Logo SOLOMA SUARL.
   - Fond clair : public/logo.png (couleurs d'origine)
   - Fond sombre : public/logo-white.png (marine passé en blanc cassé, rouge conservé) */
export function Logo({ onDark = false, heightClass = 'h-9', className }: LogoProps) {
  const src = onDark ? '/logo-white.png' : '/logo.png';
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="SOLOMA SUARL" className={cn(heightClass, 'w-auto', className)} />
  );
}
