// StatsBar.tsx — rail « palmarès » sobre, dans le langage du plan technique
const stats = [
  { value: '15', unit: 'ans', label: "d'exploitation" },
  { value: '500', unit: '+', label: 'levages exécutés' },
  { value: '50', unit: '+', label: 'équipements en flotte' },
  { value: '98', unit: '%', label: 'clients reconduits' },
];

export function StatsBar() {
  return (
    <div className="bg-ink-2 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {stats.map((s, i) => (
            <div key={i} className="relative py-6 px-5 first:pl-0 md:first:pl-5">
              {/* repère de mesure */}
              <span className="absolute left-5 top-0 h-2 w-px bg-brand-orange md:left-5 first:left-0" />
              <div className="flex items-baseline gap-1">
                <span className="font-display font-bold text-chalk text-4xl leading-none">{s.value}</span>
                <span className="font-display font-semibold text-brand-orange text-lg leading-none">{s.unit}</span>
              </div>
              <div className="readout mt-2 text-[10px] tracking-[0.16em]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
