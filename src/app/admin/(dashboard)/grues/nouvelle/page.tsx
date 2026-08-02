'use client';
import { CraneForm } from '@/components/admin/CraneForm';

export default function NouvelleGruePage() {
  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <h2 className="font-display font-bold text-navy text-xl uppercase tracking-wide">Ajouter une grue</h2>
        <p className="admin-count">Remplissez les informations de la nouvelle grue</p>
      </div>
      <div className="bg-white rounded-sm shadow-sm border border-navy/5 p-6">
        <CraneForm />
      </div>
    </div>
  );
}
