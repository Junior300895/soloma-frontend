import type { Metadata } from 'next';
import { Inter, Saira_Condensed, IBM_Plex_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Providers } from './providers';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { SITE_URL, localBusinessJsonLd } from '@/lib/seo';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const saira = Saira_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-saira',
  display: 'swap',
});
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SOLOMA SUARL — Manutention Portuaire & Levage Industriel',
    template: '%s | SOLOMA SUARL',
  },
  description:
    'Spécialiste de la manutention portuaire et du levage industriel en Afrique de l\'Ouest. Grues de 50T à 500T, opérations 24h/24.',
  keywords: ['manutention portuaire', 'levage industriel', 'location grue', 'Dakar', 'Sénégal', 'SOLOMA'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'fr_SN',
    siteName: 'SOLOMA SUARL',
    url: SITE_URL,
    title: 'SOLOMA SUARL — Manutention Portuaire & Levage Industriel',
    description:
      'Location de grues de 50 à 500 tonnes, manutention portuaire et levage industriel en Afrique de l’Ouest.',
    images: [{ url: `${SITE_URL}/logo.png`, width: 983, height: 384, alt: 'SOLOMA SUARL' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOLOMA SUARL — Manutention Portuaire & Levage Industriel',
    description: 'Location de grues, manutention portuaire et levage industriel au Sénégal.',
    images: [`${SITE_URL}/logo.png`],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${saira.variable} ${plexMono.variable}`}>
      <body className="flex flex-col min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          {/* <WhatsAppFloat /> */}
          {/* <Toaster
            position="top-right"
            toastOptions={{
              success: { style: { background: '#0A1628', color: '#fff' } },
              error: { style: { background: '#E30613', color: '#fff' } },
            }}
          /> */}
        </Providers>
      </body>
    </html>
  );
}
