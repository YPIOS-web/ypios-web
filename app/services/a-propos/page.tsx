// app/services/a-propos/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos | YPIOS",
};

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-semibold tracking-tight">À propos</h1>
      <p className="mt-4 text-neutral-600">
        YPIOS Energie — Climatisation, Ventilation et Plomberie. Interventions en Île-de-France.
      </p>
    </main>
  );
}