import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Project, ApiResponse } from '@/types';

export function useProjects(page = 1, limit = 12) {
  return useQuery({
    queryKey: ['projects', page, limit],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Project[]>>('/projects', { params: { page, limit } });
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useProject(id: number) {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Project>>(`/projects/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}
