import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="text-center">
        <div className="font-display font-black text-brand-orange/20 text-[10rem] leading-none select-none">
          404
        </div>
        <h1 className="font-display font-black text-white text-3xl uppercase tracking-wide -mt-4 mb-3">
          Page introuvable
        </h1>
        <p className="text-white/50 text-sm mb-8 max-w-md mx-auto">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="btn-primary">Retour à l'accueil</Link>
          <Link href="/contact" className="btn-outline">Nous contacter</Link>
        </div>
      </div>
    </div>
  );
}
