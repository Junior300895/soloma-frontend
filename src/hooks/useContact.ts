import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { ContactFormData, QuoteFormData } from '@/types';

export function useContact() {
  return useMutation({
    mutationFn: async (data: ContactFormData) => {
      const res = await api.post('/contact', data);
      return res.data;
    },
  });
}

export function useQuote() {
  return useMutation({
    mutationFn: async (data: QuoteFormData) => {
      const res = await api.post('/quotes', data);
      return res.data;
    },
  });
}
