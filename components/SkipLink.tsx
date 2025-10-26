// components/SkipLink.tsx
"use client";

export default function SkipLink({ targetId = "contenu" }: { targetId?: string }) {
  return (
    <a
      href={`#${targetId}`}
      className="skip-link fixed left-4 top-4 z-[60] -translate-y-16 focus:translate-y-0
                 rounded-lg bg-white/95 px-3 py-2 text-sm font-medium text-slate-900
                 shadow ring-1 ring-slate-300 transition-transform"
    >
      Aller au contenu
    </a>
  );
}