import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  }).format(new Date(dateStr));
}

export function slugify(str: string) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export const STATUS_LABELS = {
  available: 'Disponible',
  reserved: 'Réservé',
  maintenance: 'En maintenance',
} as const;

export const SERVICE_LABELS = {
  manutention: 'Manutention Portuaire',
  levage: 'Levage Industriel',
  logistique: 'Logistique',
  autre: 'Autre',
} as const;
