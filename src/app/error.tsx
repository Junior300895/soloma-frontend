'use client';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="text-center">
        <div className="font-display font-black text-brand-orange/20 text-[8rem] leading-none select-none">
          500
        </div>
        <h1 className="font-display font-black text-white text-3xl uppercase tracking-wide -mt-4 mb-3">
          Une erreur est survenue
        </h1>
        <p className="text-white/50 text-sm mb-8 max-w-md mx-auto">
          Quelque chose s'est mal passé. Veuillez réessayer ou contacter notre équipe.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={reset} className="btn-primary">Réessayer</button>
          <a href="/" className="btn-outline">Retour à l'accueil</a>
        </div>
      </div>
    </div>
  );
}
