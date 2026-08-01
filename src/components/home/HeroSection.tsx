import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/* ── Abaque de charge : le document que lit un ingénieur levage ──
   Origine = pivot de la grue. Arcs = rayons de travail.
   Flèche orange = ligne de charge, tonnage annoté au rayon. */
const O = { x: 86, y: 392 };
const arcs = [
  { r: 92, reach: '6 M' },
  { r: 176, reach: '12 M' },
  { r: 260, reach: '18 M' },
  { r: 336, reach: '24 M' },
];
const loads = [
  { x: 132, y: 312, t: '500 T' },
  { x: 174, y: 240, t: '300 T' },
  { x: 216, y: 167, t: '150 T' },
  { x: 254, y: 101, t: '70 T' },
];
const arcPath = (r: number) =>
  `M ${O.x} ${O.y - r} A ${r} ${r} 0 0 1 ${O.x + r} ${O.y}`;

function LiftDiagram() {
  return (
    <svg viewBox="0 0 560 460" className="w-full h-auto" role="img"
      aria-label="Abaque de charge : capacité de levage en fonction du rayon">
      {/* Axes */}
      <line x1={O.x} y1={O.y} x2={512} y2={O.y} stroke="var(--blueprint)" strokeWidth="1.5" />
      <line x1={O.x} y1={O.y} x2={O.x} y2={48} stroke="var(--blueprint)" strokeWidth="1.5" />

      {/* Arcs de rayon */}
      {arcs.map((a, i) => (
        <g key={a.r}>
          <path d={arcPath(a.r)} fill="none" stroke="var(--blueprint)" strokeWidth="1"
            className="arc-line" style={{ ['--dash' as string]: 900, animationDelay: `${0.2 + i * 0.12}s` }} />
          <line x1={O.x + a.r} y1={O.y} x2={O.x + a.r} y2={O.y + 7} stroke="var(--blueprint)" strokeWidth="1.5" />
          <text x={O.x + a.r} y={O.y + 22} textAnchor="middle"
            fill="var(--steel)" fontSize="12" fontFamily="var(--font-mono)" letterSpacing="1">
            {a.reach}
          </text>
        </g>
      ))}

      {/* Flèche + gréement (se relève au chargement) */}
      <g className="boom-group">
        {/* treillis */}
        <line x1={O.x} y1={O.y} x2={254} y2={101} stroke="var(--orange)" strokeWidth="5" strokeLinecap="round" />
        <line x1={O.x + 10} y1={O.y - 18} x2={264} y2={110} stroke="var(--orange)" strokeWidth="1.5" opacity="0.55" />
        {/* ligne de levage + charge */}
        <line x1={254} y1={101} x2={254} y2={236} stroke="var(--orange)" strokeWidth="1.5" />
        <rect x={242} y={236} width="24" height="18" fill="none" stroke="var(--chalk)" strokeWidth="1.5" />
      </g>

      {/* Base machine + pivot */}
      <polygon points={`${O.x - 22},${O.y} ${O.x + 22},${O.y} ${O.x + 12},${O.y - 26} ${O.x - 12},${O.y - 26}`}
        fill="var(--ink-2)" stroke="var(--steel)" strokeWidth="1.5" />
      <circle cx={O.x} cy={O.y - 26} r="4" fill="var(--orange)" />

      {/* Annotations de charge au rayon */}
      {loads.map((l) => (
        <g key={l.t}>
          <circle cx={l.x} cy={l.y} r="3.5" fill="var(--orange)" />
          <text x={l.x + 12} y={l.y - 6} fill="var(--chalk)" fontSize="15"
            fontFamily="var(--font-saira)" fontWeight="700" letterSpacing="0.5">
            {l.t}
          </text>
        </g>
      ))}

      {/* Légende des axes */}
      <text x={506} y={O.y - 12} textAnchor="end" fill="var(--blueprint)" fontSize="11"
        fontFamily="var(--font-mono)" letterSpacing="2">RAYON</text>
      <text x={O.x + 14} y={62} fill="var(--blueprint)" fontSize="11"
        fontFamily="var(--font-mono)" letterSpacing="2">CAPACITÉ</text>
    </svg>
  );
}

export function HeroSection() {
  return (
    <section className="relative bg-ink overflow-hidden">
      {/* Grille blueprint discrète */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.05]" aria-hidden />
      {/* Filet hazard en pied de hero */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-brand-orange/40" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-8 items-center">
          {/* Colonne texte */}
          <div>
            <p className="readout rise-1 flex items-center gap-2 text-brand-orange">
              LEVAGE 50–500 T · MANUTENTION PORTUAIRE · DAKAR 14.7°N
            </p>

            <h1 className="rise-2 mt-5 font-display font-extrabold uppercase text-chalk
                           leading-[0.9] tracking-[0.01em]"
                style={{ fontSize: 'clamp(2.75rem, 6.5vw, 5.25rem)' }}>
              De 50 à 500 tonnes,
              <span className="block text-brand-orange">manœuvrées</span>
              au millimètre.
            </h1>

            <p className="rise-3 mt-6 text-steel text-base sm:text-lg leading-relaxed max-w-xl">
              SOLOMA planifie, gréé et exécute vos opérations de levage et de manutention
              sur les quais d'Afrique de l'Ouest. Chaque lift est étudié avant d'être exécuté.
            </p>

            <div className="rise-4 mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Demander un devis <ArrowRight size={16} />
              </Link>
              <Link href="/catalogue-grues" className="btn-outline">
                Voir la flotte
              </Link>
            </div>

            {/* Bandeau readout */}
            <dl className="rise-4 mt-10 grid grid-cols-3 max-w-md divide-x divide-white/10 border-t border-white/10 pt-5">
              {[
                { k: 'Capacité max', v: '500 T' },
                { k: 'Amplitude', v: '6–24 M' },
                { k: 'Disponibilité', v: '24/7' },
              ].map((s) => (
                <div key={s.k} className="px-4 first:pl-0">
                  <dd className="font-display font-bold text-chalk text-2xl leading-none">{s.v}</dd>
                  <dt className="readout mt-1.5 text-[10px] tracking-[0.16em]">{s.k}</dt>
                </div>
              ))}
            </dl>
          </div>

          {/* Colonne abaque (signature) */}
          <div className="relative">
            <div className="relative rounded-sm border border-blueprint/30 bg-ink-2/60 p-5 sm:p-7">
              {/* Cartouche coin — comme un plan technique */}
              <div className="flex items-center justify-between mb-2">
                <span className="readout text-[10px] text-blueprint">SOLOMA · ABAQUE DE CHARGE</span>
                <span className="readout text-[10px] text-blueprint">RÉF. LM-500</span>
              </div>
              <LiftDiagram />
              <div className="mt-2 flex items-center justify-between">
                <span className="readout text-[10px] text-steel">Capacité nominale au rayon</span>
                <span className="readout text-[10px] text-brand-orange">● Ligne de charge</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
