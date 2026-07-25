'use client';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { Loader2, Save, ImagePlus, Trash2, Video, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { ImageUpload } from '@/components/admin/ImageUpload';

type MediaDraft = { type: 'photo'; file: File; preview: string; caption: string } | { type: 'video'; url: string; caption: string };

export default function ModifierProjetPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState<MediaDraft | null>(null);
  const [saving, setSaving] = useState(false);
  const [videoTab, setVideoTab] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [caption, setCaption] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const res = await api.get(`/projects/${id}`);
      return res.data?.data ?? res.data;
    },
  });

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<any>();

  useEffect(() => {
    if (data) {
      reset({
        title: data.title ?? '',
        client: data.client ?? '',
        location: data.location ?? '',
        completedAt: data.completedAt ? data.completedAt.slice(0, 10) : '',
        coverImage: data.coverImage ?? '',
        description: data.description ?? '',
        results: data.results ?? '',
      });
    }
  }, [data, reset]);

  const mutation = useMutation({
    mutationFn: (dto: any) => api.patch(`/projects/${id}`, dto),
    onSuccess: () => {
      toast.success('Projet mis à jour !');
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', id] });
      router.push('/admin/projets');
    },
    onError: () => toast.error('Erreur lors de la mise à jour'),
  });

  const removeMediaMutation = useMutation({
    mutationFn: (mediaId: number) => api.delete(`/projects/${id}/media/${mediaId}`),
    onSuccess: () => {
      toast.success('Média supprimé');
      queryClient.invalidateQueries({ queryKey: ['project', id] });
    },
    onError: () => toast.error('Erreur lors de la suppression'),
  });

  function openPhotoPicker() {
    setVideoTab(false);
    setCaption('');
    fileInputRef.current?.click();
  }

  function openVideoModal() {
    setVideoTab(true);
    setVideoUrl('');
    setCaption('');
    setDraft({ type: 'video', url: '', caption: '' });
  }

  function onFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setDraft({ type: 'photo', file, preview, caption: '' });
    setCaption('');
    e.target.value = '';
  }

  function cancelDraft() {
    if (draft?.type === 'photo') URL.revokeObjectURL(draft.preview);
    setDraft(null);
    setVideoUrl('');
    setCaption('');
  }

  async function confirmDraft() {
    if (!draft) return;
    setSaving(true);
    try {
      if (draft.type === 'photo') {
        const formData = new FormData();
        formData.append('file', draft.file);
        const uploadRes = await api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        const url = uploadRes.data?.data?.url ?? uploadRes.data?.url;
        await api.post(`/projects/${id}/media`, { type: 'photo', url, caption });
        URL.revokeObjectURL(draft.preview);
      } else {
        const url = videoUrl.trim();
        if (!url) { toast.error('URL de la vidéo requise'); return; }
        await api.post(`/projects/${id}/media`, { type: 'video', url, caption });
      }
      queryClient.invalidateQueries({ queryKey: ['project', id] });
      toast.success('Média ajouté');
      setDraft(null);
      setVideoUrl('');
      setCaption('');
    } catch {
      toast.error('Erreur lors de l\'ajout');
    } finally {
      setSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 size={24} className="animate-spin text-brand-orange" />
      </div>
    );
  }

  const mediaPhotos = (data?.media ?? []).filter((m: any) => m.type === 'photo');
  const mediaVideos = (data?.media ?? []).filter((m: any) => m.type === 'video');

  const fields = [
    { name: 'title', label: 'Titre du projet *', placeholder: 'Levage au port de Dakar', required: true },
    { name: 'client', label: 'Client', placeholder: 'Port Autonome de Dakar' },
    { name: 'location', label: 'Localisation', placeholder: 'Dakar, Sénégal' },
    { name: 'completedAt', label: 'Date de réalisation', placeholder: '', type: 'date' },
  ];

  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <h2 className="font-display font-bold text-navy text-lg uppercase tracking-wide">Modifier le projet</h2>
        <p className="text-steel text-xs mt-0.5">{data?.title}</p>
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

          <ImageUpload
            label="Image de couverture"
            value={watch('coverImage')}
            onChange={(url) => setValue('coverImage', url)}
          />

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
            {mutation.isPending
              ? <><Loader2 size={15} className="animate-spin" /> Enregistrement...</>
              : <><Save size={15} /> Enregistrer</>}
          </button>
        </div>
      </form>

      {/* Galerie médias */}
      <div className="bg-white rounded-sm shadow-sm border border-navy/5 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-semibold text-navy uppercase tracking-wider">Galerie médias</h3>
            <p className="text-steel text-xs mt-0.5">{mediaPhotos.length} photo(s) · {mediaVideos.length} vidéo(s)</p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={openPhotoPicker} className="btn-primary text-xs py-2">
              <ImagePlus size={13} /> Photo
            </button>
            <button type="button" onClick={openVideoModal}
              className="flex items-center gap-1.5 px-3 py-2 border border-navy/20 rounded-sm text-xs text-steel hover:border-navy/40 hover:text-navy transition-colors">
              <Video size={13} /> Vidéo
            </button>
          </div>
        </div>

        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onFileSelected} />

        {(data?.media ?? []).length === 0 && !draft ? (
          <div className="border-2 border-dashed border-navy/15 rounded-sm p-8 text-center cursor-pointer hover:border-brand-orange/40 transition-colors"
            onClick={openPhotoPicker}>
            <ImagePlus size={28} className="mx-auto text-navy/25 mb-2" />
            <p className="text-steel text-xs">Cliquez pour ajouter des photos ou des vidéos</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {(data?.media ?? []).map((m: any) => (
              <div key={m.id} className="relative group rounded-sm overflow-hidden bg-navy/5">
                {m.type === 'photo' ? (
                  <img src={m.url} alt={m.caption || ''} className="w-full aspect-video object-cover" />
                ) : (
                  <div className="aspect-video flex flex-col items-center justify-center gap-1 bg-navy/8">
                    <Video size={22} className="text-navy/40" />
                    <span className="text-xs text-steel truncate max-w-full px-2">{m.caption || 'Vidéo'}</span>
                  </div>
                )}
                {m.caption && (
                  <div className="px-2 py-1 bg-white border-t border-navy/5">
                    <p className="text-xs text-steel truncate">{m.caption}</p>
                  </div>
                )}
                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button type="button" onClick={() => removeMediaMutation.mutate(m.id)}
                    disabled={removeMediaMutation.isPending}
                    className="p-1 bg-red-500 hover:bg-red-600 text-white rounded-sm" title="Supprimer">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
            <div className="aspect-video rounded-sm border-2 border-dashed border-navy/15 flex items-center justify-center cursor-pointer hover:border-brand-orange/40 transition-colors"
              onClick={openPhotoPicker}>
              <ImagePlus size={20} className="text-navy/30" />
            </div>
          </div>
        )}
      </div>

      {/* Modal ajout média */}
      {draft && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-xl p-6 w-full max-w-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-navy text-sm">
                {draft.type === 'photo' ? 'Ajouter une photo' : 'Ajouter une vidéo'}
              </h3>
              <button type="button" onClick={cancelDraft} className="text-steel hover:text-navy">
                <X size={16} />
              </button>
            </div>

            {draft.type === 'photo' ? (
              <img src={draft.preview} alt="Aperçu" className="w-full aspect-video object-cover rounded-sm bg-navy/5" />
            ) : (
              <div>
                <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">URL de la vidéo *</label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="input-field"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                Légende <span className="font-normal text-steel normal-case">(optionnel)</span>
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Ex : Levage de 80 tonnes au port de Dakar"
                className="input-field"
              />
            </div>

            <div className="flex gap-3 pt-1">
              <button type="button" onClick={cancelDraft}
                className="flex-1 py-2 border border-navy/20 rounded-sm text-sm text-steel hover:border-navy/40">
                Annuler
              </button>
              <button type="button" onClick={confirmDraft} disabled={saving}
                className="flex-1 py-2 btn-primary text-sm disabled:opacity-60">
                {saving
                  ? <><Loader2 size={14} className="animate-spin" /> Upload...</>
                  : <><Check size={14} /> Confirmer</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
