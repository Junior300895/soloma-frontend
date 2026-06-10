'use client';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Loader2, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NouveauProjetPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm<any>();

  const mutation = useMutation({
    mutationFn: (data: any) => api.post('/projects', data),
    onSuccess: () => {
      toast.success('Projet créé !');
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      router.push('/admin/projets');
    },
    onError: () => toast.error('Erreur lors de la création'),
  });

  const fields = [
    { name: 'title', label: 'Titre du projet *', placeholder: 'Levage d\'une structure au port de Dakar', required: true },
    { name: 'client', label: 'Client', placeholder: 'Port Autonome de Dakar' },
    { name: 'location', label: 'Localisation', placeholder: 'Dakar, Sénégal' },
    { name: 'completedAt', label: 'Date de réalisation', placeholder: '', type: 'date' },
    { name: 'coverImage', label: 'Image de couverture (URL)', placeholder: 'https://...' },
  ];

  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <h2 className="font-display font-bold text-navy text-lg uppercase tracking-wide">Nouveau Projet</h2>
        <p className="text-steel text-xs mt-0.5">Ajouter une réalisation au portfolio</p>
      </div>

      <form onSubmit={handleSubmit((d) => mutation.mutate(d))}>
        <div className="bg-white rounded-sm shadow-sm border border-navy/5 p-6 space-y-4">
          {fields.map((f) => (
            <div key={f.name}>
              <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">{f.label}</label>
              <input
                {...register(f.name, { required: f.required ? `${f.label} requis` : false })}
                type={f.type || 'text'}
                placeholder={f.placeholder}
                className="input-field"
              />
              {errors[f.name] && <p className="text-red-500 text-xs mt-1">{errors[f.name]?.message as string}</p>}
            </div>
          ))}

          <div>
            <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">Description</label>
            <textarea {...register('description')} rows={4} placeholder="Description du projet..." className="input-field resize-none" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">Résultats obtenus</label>
            <textarea {...register('results')} rows={3} placeholder="Résultats, performances, chiffres clés..." className="input-field resize-none" />
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button type="button" onClick={() => router.back()}
            className="px-5 py-2.5 border border-navy/20 rounded-sm text-sm text-steel hover:border-navy/40 transition-colors">
            Annuler
          </button>
          <button type="submit" disabled={mutation.isPending} className="btn-primary">
            {mutation.isPending ? <><Loader2 size={15} className="animate-spin" /> Enregistrement...</> : <><Save size={15} /> Créer le projet</>}
          </button>
        </div>
      </form>
    </div>
  );
}
