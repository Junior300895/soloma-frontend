import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsBar } from '@/components/home/StatsBar';
import { ServicesSection } from '@/components/home/ServicesSection';
import { AboutSection } from '@/components/home/AboutSection';
import { CatalogPreview } from '@/components/home/CatalogPreview';
import { PortfolioSection } from '@/components/home/PortfolioSection';
import { CtaBand } from '@/components/home/CtaBand';
import { BlogPreview } from '@/components/home/BlogPreview';

export const metadata: Metadata = {
  title: 'SOLOMA SUARL — Manutention Portuaire & Levage Industriel',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <ServicesSection />
      <AboutSection />
      <CatalogPreview />
      <PortfolioSection />
      <CtaBand />
      <BlogPreview />
    </>
  );
}
