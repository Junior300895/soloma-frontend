'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Send, Loader2 } from 'lucide-react';
import { useContact } from '@/hooks/useContact';

const schema = z.object({
  fullName: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message trop court (min 10 caractères)'),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const { mutate, isPending } = useContact();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    mutate(data, {
      onSuccess: () => {
        toast.success('Message envoyé ! Nous vous répondrons rapidement.');
        reset();
      },
      onError: (err) => {
        toast.error(err.message || 'Une erreur est survenue.');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <label className="field-label">Sujet</label>
          <input {...register('subject')} placeholder="Demande de devis..." className="input-field" />
        </div>
      </div>

      <div>
        <label className="field-label">Message <span className="text-brand-orange">*</span></label>
        <textarea
          {...register('message')}
          rows={5}
          placeholder="Décrivez votre besoin..."
          className="input-field resize-none"
        />
        {errors.message && <p className="field-error">{errors.message.message}</p>}
      </div>

      <button type="submit" disabled={isPending} className="btn-primary w-full justify-center">
        {isPending ? (
          <><Loader2 size={16} className="animate-spin" /> Envoi en cours...</>
        ) : (
          <><Send size={16} /> Envoyer le message</>
        )}
      </button>
    </form>
  );
}
