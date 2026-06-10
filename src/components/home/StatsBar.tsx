// StatsBar.tsx
const stats = [
  { value: '15+', label: "Années d'expérience" },
  { value: '500+', label: 'Projets réalisés' },
  { value: '50+', label: 'Équipements' },
  { value: '98%', label: 'Satisfaction client' },
];

export function StatsBar() {
  return (
    <div className="bg-brand-orange">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="py-5 px-4 text-center border-r border-white/20 last:border-r-0"
            >
              <div className="font-display font-black text-white text-3xl leading-none mb-1">
                {s.value}
              </div>
              <div className="text-white/80 text-xs font-medium tracking-wider uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
