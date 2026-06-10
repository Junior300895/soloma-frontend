# SOLOMA SUARL — Frontend (Next.js 14)

## Prérequis
- Node.js 18+
- npm

## Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer les variables d'environnement
cp .env.local.example .env.local
# Éditer .env.local :
#   NEXT_PUBLIC_API_URL=http://localhost:3001/v1
#   NEXT_PUBLIC_WHATSAPP=+221XXXXXXXXX

# 3. Démarrer en développement
npm run dev
```

## URL locale
http://localhost:3000

## Pages disponibles
| Route | Description |
|-------|-------------|
| `/` | Page d'accueil |
| `/a-propos` | Présentation de l'entreprise |
| `/services` | Liste des services |
| `/services/[slug]` | Détail d'un service |
| `/catalogue-grues` | Catalogue avec filtres |
| `/realisations` | Portfolio projets |
| `/actualites` | Blog / Actualités |
| `/contact` | Formulaire de contact |

## Stack
- Next.js 14 (App Router)
- Tailwind CSS
- React Query v5 (data fetching)
- Zustand (état filtres)
- React Hook Form + Zod (formulaires)
- Framer Motion (animations)
- Lucide React (icônes)

## Production
```bash
npm run build
npm run start
```
