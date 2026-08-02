import { cn } from '@/lib/utils';

interface LogoProps {
  /** Sur fond sombre : pose le logo sur une plaque blanche pour rester lisible */
  onDark?: boolean;
  /** Hauteur du logo en classes Tailwind (défaut h-9) */
  heightClass?: string;
  className?: string;
}

/* Logo SOLOMA SUARL. Déposez le fichier dans public/logo.png (PNG transparent, recadré). */
export function Logo({ onDark = false, heightClass = 'h-9', className }: LogoProps) {
  // eslint-disable-next-line @next/next/no-img-element
  const img = <img src="/logo.png" alt="SOLOMA SUARL" className={cn(heightClass, 'w-auto')} />;

  if (onDark) {
    return (
      <span className={cn('inline-flex items-center bg-white rounded-sm px-2.5 py-1.5', className)}>
        {img}
      </span>
    );
  }
  return <span className={cn('inline-flex items-center', className)}>{img}</span>;
}
