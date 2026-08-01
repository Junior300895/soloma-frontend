export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-ink flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-[0.05]" aria-hidden />
      <div className="relative">{children}</div>
    </div>
  );
}
