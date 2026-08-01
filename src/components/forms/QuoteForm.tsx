'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Send, Loader2 } from 'lucide-react';
import { useQuote } from '@/hooks/useContact';

const schema = z.object({
  fullName: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  company: z.string().optional(),
  serviceType: z.enum(['manutention', 'levage', 'logistique', 'autre']).optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface QuoteFormProps {
  craneId?: number;
  craneName?: string;
}

export function QuoteForm({ craneId, craneName }: QuoteFormProps) {
  const { mutate, isPending } = useQuote();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { serviceType: 'levage' },
  });

  const onSubmit = (data: FormData) => {
    mutate({ ...data, craneId }, {
      onSuccess: () => {
        toast.success('Demande envoyée ! Nous vous contactons rapidement.');
        reset();
      },
      onError: (err: any) => toast.error(err.message || 'Erreur lors de l\'envoi'),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {craneName && (
        <div className="flex items-center gap-3 bg-brand-orange/10 border border-brand-orange/30 rounded-sm p-3">
          <span className="font-mono text-[10px] tracking-[0.14em] text-brand-orange
                           border border-brand-orange/40 rounded-sm px-1.5 py-0.5 shrink-0">GRUE</span>
          <span className="text-sm text-navy">Devis pour : <strong>{craneName}</strong></span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="field-label">Nom complet <span className="text-brand-orange">*</span></label>
          <input {...register('fullName')} placeholder="Ibrahima Diallo" className="input-field" />
          {errors.fullName && <p className="field-error">{errors.fullName.message}</p>}
        </div>
        <div>
          <label className="field-label">Email <span className="text-brand-orange">*</span></label>
          <input {...register('email')} type="email" placeholder="i.diallo@example.com" className="input-field" />
          {errors.email && <p className="field-error">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="field-label">Téléphone</label>
          <input {...register('phone')} placeholder="+221 77 000 00 00" className="input-field" />
        </div>
        <div>
          <label className="field-label">Entreprise</label>
          <input {...register('company')} placeholder="Port Autonome de Dakar" className="input-field" />
        </div>
      </div>

      <div>
        <label className="field-label">Service requis</label>
        <select {...register('serviceType')} className="input-field">
          <option value="levage">Levage Industriel</option>
          <option value="manutention">Manutention Portuaire</option>
          <option value="logistique">Opérations Logistiques</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      <div>
        <label className="field-label">Message / Détails</label>
        <textarea {...register('message')} rows={4} placeholder="Décrivez vos besoins, dates, durée..." className="input-field resize-none" />
      </div>

      <button type="submit" disabled={isPending} className="btn-primary w-full justify-center">
        {isPending ? <><Loader2 size={16} className="animate-spin" /> Envoi...</> : <><Send size={16} /> Envoyer la demande</>}
      </button>
    </form>
  );
}
