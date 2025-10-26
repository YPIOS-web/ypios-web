// app/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="animate-pulse text-slate-500">Chargement…</div>
    </div>
  );
}