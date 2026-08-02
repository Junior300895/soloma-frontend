'use client';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Plus, Pencil, ToggleLeft, ToggleRight, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';

interface Service {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
  sortOrder: number;
}

const emptyForm = { slug: '', title: '', description: '', icon: '', sortOrder: 0 };

export default function AdminServicesPage() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);

  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ['admin-services'],
    queryFn: async () => {
      const res = await api.get('/services', { params: { all: true } });
      return res.data?.data ?? res.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: (dto: typeof emptyForm) => api.post('/services', dto),
    onSuccess: () => {
      toast.success('Service créé');
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      resetForm();
    },
    onError: () => toast.error('Erreur lors de la création'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: Partial<typeof emptyForm> }) =>
      api.patch(`/services/${id}`, dto),
    onSuccess: () => {
      toast.success('Service mis à jour');
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      resetForm();
    },
    onError: () => toast.error('Erreur lors de la mise à jour'),
  });

  const toggleMutation = useMutation({
    mutationFn: (s: Service) => api.patch(`/services/${s.id}`, { isActive: !s.isActive }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-services'] }),
    onError: () => toast.error('Erreur'),
  });

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  }

  function openEdit(s: Service) {
    setForm({ slug: s.slug, title: s.title, description: s.description, icon: s.icon, sortOrder: s.sortOrder });
    setEditingId(s.id);
    setShowForm(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, dto: form });
    } else {
      createMutation.mutate(form);
    }
  }

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-navy text-xl uppercase tracking-wide">Services</h2>
          <p className="admin-count">{services.length} service(s)</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="btn-primary text-xs py-2.5">
          <Plus size={15} /> Nouveau service
        </button>
      </div>

      {/* Formulaire */}
      {showForm && (
        <div className="bg-white rounded-sm shadow-sm border border-navy/5 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-navy text-base uppercase tracking-wide">
              {editingId ? 'Modifier le service' : 'Nouveau service'}
            </h3>
            <button onClick={resetForm} className="text-steel hover:text-navy">
              <X size={16} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="field-label">Titre *</label>
              <input
                required
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                className="w-full border border-navy/15 rounded-sm px-3 py-2 text-sm text-navy focus:outline-none focus:border-brand-orange"
                placeholder="Ex: Levage Industriel"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="field-label">Slug *</label>
              <input
                required
                value={form.slug}
                onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                className="w-full border border-navy/15 rounded-sm px-3 py-2 text-sm text-navy focus:outline-none focus:border-brand-orange"
                placeholder="Ex: levage-industriel"
              />
            </div>
            <div className="col-span-2">
              <label className="field-label">Description</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className="w-full border border-navy/15 rounded-sm px-3 py-2 text-sm text-navy focus:outline-none focus:border-brand-orange resize-none"
                placeholder="Description courte du service"
              />
            </div>
            <div>
              <label className="field-label">Icône (nom lucide)</label>
              <input
                value={form.icon}
                onChange={e => setForm(f => ({ ...f, icon: e.target.value }))}
                className="w-full border border-navy/15 rounded-sm px-3 py-2 text-sm text-navy focus:outline-none focus:border-brand-orange"
                placeholder="Ex: Wrench, Ship, Package"
              />
            </div>
            <div>
              <label className="field-label">Ordre d'affichage</label>
              <input
                type="number"
                min={0}
                value={form.sortOrder}
                onChange={e => setForm(f => ({ ...f, sortOrder: Number(e.target.value) }))}
                className="w-full border border-navy/15 rounded-sm px-3 py-2 text-sm text-navy focus:outline-none focus:border-brand-orange"
              />
            </div>
            <div className="col-span-2 flex justify-end gap-3">
              <button type="button" onClick={resetForm}
                className="px-4 py-2 border border-navy/20 rounded-sm text-sm text-steel hover:border-navy/40">
                Annuler
              </button>
              <button type="submit" disabled={isPending}
                className="btn-primary text-xs py-2 disabled:opacity-60">
                <Check size={14} />
                {isPending ? 'Enregistrement...' : editingId ? 'Mettre à jour' : 'Créer'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tableau */}
      <div className="bg-white rounded-sm shadow-sm border border-navy/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F4F6F9] border-b border-navy/8">
              {['Ordre', 'Titre', 'Slug', 'Icône', 'Statut', 'Actions'].map(h => (
                <th key={h} className="admin-th">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="border-b border-navy/5">
                  {Array.from({ length: 6 }).map((_, j) => (
                    <td key={j} className="px-4 py-3"><div className="h-4 bg-navy/5 rounded animate-pulse" /></td>
                  ))}
                </tr>
              ))
            ) : services.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-12 text-steel">
                Aucun service. <button onClick={() => setShowForm(true)} className="text-brand-orange font-medium">En créer un →</button>
              </td></tr>
            ) : (
              services.map((s) => (
                <tr key={s.id} className="border-b border-navy/5 hover:bg-[#F4F6F9]/50 transition-colors">
                  <td className="px-4 py-3 text-steel text-xs">{s.sortOrder}</td>
                  <td className="px-4 py-3 font-medium text-navy">{s.title}</td>
                  <td className="px-4 py-3 text-steel text-xs font-mono">{s.slug}</td>
                  <td className="px-4 py-3 text-steel text-xs">{s.icon || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`admin-badge ${
                      s.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {s.isActive ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(s)}
                        className="p-1.5 text-steel hover:text-navy hover:bg-navy/5 rounded-sm transition-colors" title="Modifier">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => toggleMutation.mutate(s)}
                        className="p-1.5 text-steel hover:text-brand-orange hover:bg-orange-50 rounded-sm transition-colors"
                        title={s.isActive ? 'Désactiver' : 'Activer'}>
                        {s.isActive ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
