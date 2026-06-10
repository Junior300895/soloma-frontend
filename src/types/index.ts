// ─── Grues ────────────────────────────────────────────────────
export type CraneStatus = 'available' | 'reserved' | 'maintenance';

export interface Crane {
  id: number;
  model: string;
  brand: string;
  capacityT: number;
  maxHeightM: number;
  maxRadiusM: number;
  status: CraneStatus;
  description?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CraneFilters {
  status?: CraneStatus;
  capacityMin?: number;
  capacityMax?: number;
  brand?: string;
  page?: number;
  limit?: number;
}

// ─── Devis ────────────────────────────────────────────────────
export type ServiceType = 'manutention' | 'levage' | 'logistique' | 'autre';
export type QuoteStatus = 'pending' | 'processed' | 'archived';

export interface QuoteFormData {
  craneId?: number;
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  serviceType?: ServiceType;
  message?: string;
}

// ─── Projets ──────────────────────────────────────────────────
export type MediaType = 'photo' | 'video';

export interface ProjectMedia {
  id: number;
  type: MediaType;
  url: string;
  caption?: string;
  sortOrder: number;
}

export interface Project {
  id: number;
  title: string;
  location?: string;
  client?: string;
  description?: string;
  results?: string;
  coverImage?: string;
  completedAt?: string;
  media: ProjectMedia[];
  createdAt: string;
}

// ─── Blog ─────────────────────────────────────────────────────
export type PostStatus = 'draft' | 'published' | 'archived';

export interface PostCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  status: PostStatus;
  publishedAt?: string;
  category?: PostCategory;
  createdAt: string;
}

// ─── Contact ──────────────────────────────────────────────────
export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

// ─── Service (page) ───────────────────────────────────────────
export interface ServicePage {
  id: number;
  slug: string;
  title: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
  isActive: boolean;
  sortOrder: number;
}

// ─── API Response ─────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message: string;
}
