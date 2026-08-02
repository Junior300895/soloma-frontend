'use client';
import { useCrane } from '@/hooks/useCranes';
import { CraneForm } from '@/components/admin/CraneForm';

export default function EditGruePage({ params }: { params: { id: string } }) {
  const { data: crane, isLoading } = useCrane(Number(params.id));

  if (isLoading) return (
    <div className="max-w-2xl">
      <div className="bg-white rounded-sm p-6 space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-10 bg-navy/5 rounded animate-pulse" />
        ))}
      </div>
    </div>
  );

  if (!crane) return <p className="text-steel">Grue introuvable.</p>;

  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <h2 className="font-display font-bold text-navy text-xl uppercase tracking-wide">
          Modifier la grue
        </h2>
        <p className="admin-count">{crane.brand} {crane.model}</p>
      </div>
      <div className="bg-white rounded-sm shadow-sm border border-navy/5 p-6">
        <CraneForm crane={crane} />
      </div>
    </div>
  );
}
