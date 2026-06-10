import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

interface LoginData { email: string; password: string }

export function useAuth() {
  const router = useRouter();
  const { setAuth, logout: clearAuth, token, user, isAuthenticated } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      const res = await api.post('/auth/login', data);
      return res.data.data ?? res.data;
    },
    onSuccess: (data) => {
      setAuth(data.access_token, data.user);
      // Injecter le token dans les headers Axios pour toutes les requêtes suivantes
      api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
      toast.success(`Bienvenue, ${data.user.name} !`);
      router.push('/admin');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Identifiants invalides');
    },
  });

  const logout = () => {
    clearAuth();
    delete api.defaults.headers.common['Authorization'];
    router.push('/admin/login');
  };

  // Réhydrater le header Axios si token déjà en store
  if (token && !api.defaults.headers.common['Authorization']) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return { loginMutation, logout, token, user, isAuthenticated };
}
