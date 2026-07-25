'use client';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Loader2, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { ImageUpload } from '@/components/admin/ImageUpload';

const schema = z.object({
  title: z.string().min(3, 'Titre requis'),
  slug: z.string().min(3, 'Slug requis').regex(/^[a-z0-9-]+$/, 'Slug invalide'),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  coverImage: z.string().url('URL invalide').optional().or(z.literal('')),
  status: z.enum(['draft', 'published', 'archived']),
});
type FormData = z.infer<typeof schema>;

export default function ModifierArticlePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: post, isLoading } = useQuery({
    queryKey: ['post-edit', id],
    queryFn: async () => {
      const res = await api.get(`/posts/by-id/${id}`);
      return res.data?.data ?? res.data;
    },
  });

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: 'draft' },
  });

  useEffect(() => {
    if (post) {
      reset({
        title: post.title ?? '',
        slug: post.slug ?? '',
        excerpt: post.excerpt ?? '',
        content: post.content ?? '',
        coverImage: post.coverImage ?? '',
        status: post.status ?? 'draft',
      });
    }
  }, [post, reset]);

  const mutation = useMutation({
    mutationFn: (data: FormData) => api.patch(`/posts/${id}`, data),
    onSuccess: () => {
      toast.success('Article mis à jour !');
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
      router.push('/admin/blog');
    },
    onError: () => toast.error('Erreur lors de la mise à jour'),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-steel" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-5">
      <div>
        <h2 className="font-display font-bold text-navy text-lg uppercase tracking-wide">Modifier l'Article</h2>
        <p className="text-steel text-xs mt-0.5">Modifier les informations de l'article</p>
      </div>

      <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-5">
        <div className="bg-white rounded-sm shadow-sm border border-navy/5 p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">Titre *</label>
            <input {...register('title')} placeholder="Titre de l'article" className="input-field" />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">Slug (URL) *</label>
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

          <ImageUpload
            label="Image de couverture"
            value={watch('coverImage')}
            onChange={(url) => setValue('coverImage', url, { shouldValidate: true })}
          />

          <div>
            <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">Statut</label>
            <select {...register('status')} className="input-field max-w-xs">
              <option value="draft">Brouillon</option>
              <option value="published">Publié</option>
              <option value="archived">Archivé</option>
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
              : <><Save size={15} /> Enregistrer</>}
          </button>
        </div>
      </form>
    </div>
  );
}
