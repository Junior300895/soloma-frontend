export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F4F6F9] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
        <span className="text-steel text-xs uppercase tracking-[3px]">Chargement...</span>
      </div>
    </div>
  );
}
