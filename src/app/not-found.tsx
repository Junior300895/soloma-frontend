import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-ink flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-[0.05]" aria-hidden />
      <div className="relative text-center">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand-orange mb-4">
          Erreur 404 · hors de l'abaque
        </p>
        <div className="font-display font-extrabold text-chalk/10 text-[9rem] sm:text-[12rem] leading-none select-none">
          404
        </div>
        <h1 className="font-display font-extrabold text-chalk text-3xl sm:text-4xl uppercase tracking-[0.01em] -mt-6 mb-3">
          Charge introuvable
        </h1>
        <p className="text-steel text-sm mb-8 max-w-md mx-auto">
          Cette page n'est pas au rayon demandé. Elle a peut-être été déplacée ou n'existe plus.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="btn-primary">Retour à l'accueil</Link>
          <Link href="/contact" className="btn-outline">Nous contacter</Link>
        </div>
      </div>
    </div>
  );
}
