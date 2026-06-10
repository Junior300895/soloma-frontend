import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Crane, CraneFilters, ApiResponse } from '@/types';

export function useCranes(filters: CraneFilters = {}) {
  return useQuery({
    queryKey: ['cranes', filters],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Crane[]>>('/cranes', { params: filters });
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useCrane(id: number) {
  return useQuery({
    queryKey: ['cranes', id],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Crane>>(`/cranes/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}
