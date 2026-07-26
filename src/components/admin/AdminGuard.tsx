'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, hasHydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.replace('/admin/login');
    }
  }, [hasHydrated, isAuthenticated, router]);

  // Attendre la réhydratation du store avant de décider
  if (!hasHydrated || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
