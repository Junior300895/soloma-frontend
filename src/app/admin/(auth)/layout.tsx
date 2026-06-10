export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4"
         style={{
           backgroundImage: 'linear-gradient(rgba(232,96,28,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(232,96,28,0.05) 1px, transparent 1px)',
           backgroundSize: '60px 60px',
         }}>
      {children}
    </div>
  );
}
