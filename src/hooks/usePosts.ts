import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Post, PostCategory, ApiResponse } from '@/types';

export function usePosts(page = 1, limit = 9, categoryId?: number) {
  return useQuery({
    queryKey: ['posts', page, limit, categoryId],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Post[]>>('/posts', {
        params: { page, limit, ...(categoryId ? { categoryId } : {}) },
      });
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: ['posts', slug],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Post>>(`/posts/${slug}`);
      return data.data;
    },
    enabled: !!slug,
  });
}

export function usePostCategories() {
  return useQuery({
    queryKey: ['post-categories'],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<PostCategory[]>>('/posts/categories');
      return data.data;
    },
    staleTime: 1000 * 60 * 10,
  });
}
