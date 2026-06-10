'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Loader2, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const schema = z.object({
  title: z.string().min(3, 'Titre requis'),
  slug: z.string().min(3, 'Slug requis').regex(/^[a-z0-9-]+$/, 'Slug invalide (lettres minuscules et tirets uniquement)'),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  coverImage: z.string().url('URL invalide').optional().or(z.literal('')),
  status: z.enum(['draft', 'published']),
});
type FormData = z.infer<typeof schema>;

function slugify(str: string) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export default function NouvelArticlePage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: 'draft' },
  });

  const mutation = useMutation({
    mutationFn: (data: FormData) => api.post('/posts', data),
    onSuccess: () => {
      toast.success('Article créé !');
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
      router.push('/admin/blog');
    },
    onError: () => toast.error('Erreur lors de la création'),
  });

  const titleValue = watch('title');

  return (
    <div className="max-w-3xl space-y-5">
      <div>
        <h2 className="font-display font-bold text-navy text-lg uppercase tracking-wide">Nouvel Article</h2>
        <p className="text-steel text-xs mt-0.5">Créer un article pour le blog SOLOMA</p>
      </div>

      <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-5">
        <div className="bg-white rounded-sm shadow-sm border border-navy/5 p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">Titre *</label>
            <input
              {...register('title')}
              placeholder="Titre de l'article"
              className="input-field"
              onBlur={(e) => { if (!watch('slug')) setValue('slug', slugify(e.target.value)); }}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
              Slug (URL) *
            </label>
            <div className="flex items-center gap-2">
              <span className="text-steel text-xs">/actualites/</span>
              <input {...register('slug')} placeholder="mon-article" className="input-field flex-1" />
            </div>
            {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">Extrait</label>
            <textarea {...register('excerpt')} rows={2} placeholder="Résumé court de l'article..." className="input-field resize-none" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">Contenu</label>
            <textarea {...register('content')} rows={12} placeholder="Contenu de l'article (HTML supporté)..." className="input-field resize-none font-mono text-xs" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">Image de couverture (URL)</label>
            <input {...register('coverImage')} placeholder="https://..." className="input-field" />
            {errors.coverImage && <p className="text-red-500 text-xs mt-1">{errors.coverImage.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">Statut</label>
            <select {...register('status')} className="input-field max-w-xs">
              <option value="draft">Brouillon</option>
              <option value="published">Publier immédiatement</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={() => router.back()}
            className="px-5 py-2.5 border border-navy/20 rounded-sm text-sm text-steel hover:border-navy/40 transition-colors">
            Annuler
          </button>
          <button type="submit" disabled={mutation.isPending} className="btn-primary">
            {mutation.isPending
              ? <><Loader2 size={15} className="animate-spin" /> Enregistrement...</>
              : <><Save size={15} /> Créer l'article</>}
          </button>
        </div>
      </form>
    </div>
  );
}
