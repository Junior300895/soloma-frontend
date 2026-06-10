import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Providers } from './providers';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'SOLOMA SUARL — Manutention Portuaire & Levage Industriel',
    template: '%s | SOLOMA SUARL',
  },
  description:
    'Spécialiste de la manutention portuaire et du levage industriel en Afrique de l\'Ouest. Grues de 50T à 500T, opérations 24h/24.',
  keywords: ['manutention portuaire', 'levage industriel', 'location grue', 'Dakar', 'Sénégal', 'SOLOMA'],
  openGraph: {
    type: 'website',
    locale: 'fr_SN',
    siteName: 'SOLOMA SUARL',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          {/* <WhatsAppFloat /> */}
          {/* <Toaster
            position="top-right"
            toastOptions={{
              success: { style: { background: '#0A1628', color: '#fff' } },
              error: { style: { background: '#E8601C', color: '#fff' } },
            }}
          /> */}
        </Providers>
      </body>
    </html>
  );
}
