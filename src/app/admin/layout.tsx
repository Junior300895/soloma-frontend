import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: 'Admin SOLOMA', template: '%s | Admin SOLOMA' },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
