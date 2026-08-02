'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Loader2, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '@/lib/api';
import { ImageUpload } from '@/components/admin/ImageUpload';
import type { Crane } from '@/types';

const schema = z.object({
  model: z.string().min(1, 'Modèle requis'),
  brand: z.string().min(1, 'Marque requise'),
  capacityT: z.coerce.number().min(1, 'Capacité requise'),
  maxHeightM: z.coerce.number().min(1, 'Hauteur requise'),
  maxRadiusM: z.coerce.number().min(1, 'Rayon requis'),
  status: z.enum(['available', 'reserved', 'maintenance']),
  description: z.string().optional(),
  imageUrl: z.string().url('URL invalide').optional().or(z.literal('')),
});
type FormData = z.infer<typeof schema>;

interface CraneFormProps { crane?: Crane }

export function CraneForm({ crane }: CraneFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEditing = !!crane;

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: crane ? {
      model: crane.model,
      brand: crane.brand,
      capacityT: crane.capacityT,
      maxHeightM: crane.maxHeightM,
      maxRadiusM: crane.maxRadiusM,
      status: crane.status,
      description: crane.description || '',
      imageUrl: crane.imageUrl || '',
    } : { status: 'available' },
  });

  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      isEditing
        ? api.patch(`/cranes/${crane!.id}`, data)
        : api.post('/cranes', data),
    onSuccess: () => {
      toast.success(isEditing ? 'Grue mise à jour !' : 'Grue créée !');
      queryClient.invalidateQueries({ queryKey: ['cranes'] });
      router.push('/admin/grues');
    },
    onError: () => toast.error('Une erreur est survenue'),
  });

  const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
    <div>
      <label className="field-label">{label}</label>
      {children}
      {error && <p className="field-error">{error}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Marque" error={errors.brand?.message}>
          <input {...register('brand')} placeholder="LIEBHERR" className="input-field" />
        </Field>
        <Field label="Modèle" error={errors.model?.message}>
          <input {...register('model')} placeholder="LTM 1050" className="input-field" />
        </Field>
        <Field label="Capacité (tonnes)" error={errors.capacityT?.message}>
          <input {...register('capacityT')} type="number" placeholder="50" className="input-field" />
        </Field>
        <Field label="Hauteur max (mètres)" error={errors.maxHeightM?.message}>
          <input {...register('maxHeightM')} type="number" placeholder="38" className="input-field" />
        </Field>
        <Field label="Rayon max (mètres)" error={errors.maxRadiusM?.message}>
          <input {...register('maxRadiusM')} type="number" placeholder="44" className="input-field" />
        </Field>
        <Field label="Statut" error={errors.status?.message}>
          <select {...register('status')} className="input-field">
            <option value="available">Disponible</option>
            <option value="reserved">Réservé</option>
            <option value="maintenance">En maintenance</option>
          </select>
        </Field>
      </div>

      <ImageUpload
        label="Image de la grue"
        value={watch('imageUrl')}
        onChange={(url) => setValue('imageUrl', url, { shouldValidate: true })}
      />

      <Field label="Description" error={errors.description?.message}>
        <textarea {...register('description')} rows={4} placeholder="Description de la grue..." className="input-field resize-none" />
      </Field>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={() => router.back()}
          className="px-5 py-2.5 border border-navy/20 rounded-sm text-sm text-steel hover:border-navy/40 transition-colors">
          Annuler
        </button>
        <button type="submit" disabled={mutation.isPending} className="btn-primary">
          {mutation.isPending ? <><Loader2 size={15} className="animate-spin" /> Enregistrement...</> : <><Save size={15} /> {isEditing ? 'Mettre à jour' : 'Créer la grue'}</>}
        </button>
      </div>
    </form>
  );
}
