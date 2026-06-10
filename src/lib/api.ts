import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/v1',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Intercepteur pour extraire data.data automatiquement
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || 'Une erreur est survenue';
    return Promise.reject(new Error(message));
  },
);
