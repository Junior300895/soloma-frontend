'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

const schema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Mot de passe requis'),
});
type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const { loginMutation } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => loginMutation.mutate(data);

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-sm
                        bg-white/[0.03] border border-brand-orange/30 mb-4">
          <Lock size={28} className="text-brand-orange" />
        </div>
        <h1 className="font-display font-extrabold text-chalk text-2xl uppercase tracking-[3px]">
          SOLOMA <span className="text-brand-orange">ADMIN</span>
        </h1>
        <p className="font-mono text-[10px] text-blueprint mt-1.5 tracking-[0.15em] uppercase">Console de gestion · accès restreint</p>
      </div>

      {/* Card */}
      <div className="bg-ink-2 border border-blueprint/30 rounded-sm p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-chalk text-lg uppercase tracking-wide">
            Connexion
          </h2>
          <span className="font-mono text-[10px] text-blueprint tracking-[0.15em]">RÉF. AUTH</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block font-mono text-[11px] text-white/60 uppercase tracking-[0.12em] mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-steel" />
              <input
                {...register('email')}
                type="email"
                placeholder="admin@soloma.sn"
                className="w-full bg-navy border border-white/10 text-white placeholder:text-white/25
                           pl-9 pr-4 py-3 rounded-sm text-sm focus:outline-none focus:border-brand-orange
                           transition-colors"
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block font-mono text-[11px] text-white/60 uppercase tracking-[0.12em] mb-1.5">
              Mot de passe
            </label>
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-steel" />
              <input
                {...register('password')}
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full bg-navy border border-white/10 text-white placeholder:text-white/25
                           pl-9 pr-10 py-3 rounded-sm text-sm focus:outline-none focus:border-brand-orange
                           transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-steel hover:text-white transition-colors"
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-bold
                       py-3 rounded-sm text-sm uppercase tracking-wider transition-colors
                       flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
          >
            {loginMutation.isPending ? (
              <><Loader2 size={16} className="animate-spin" /> Connexion...</>
            ) : 'Se connecter'}
          </button>
        </form>
      </div>

      <p className="text-center text-white/20 text-xs mt-6">
        © {new Date().getFullYear()} SOLOMA SUARL — Accès restreint
      </p>
    </div>
  );
}
