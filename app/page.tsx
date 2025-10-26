// app/page.tsx
import type { Metadata } from "next";
import YpiosLanding from "@/components/YpiosLanding";

export const metadata: Metadata = {
  title: "Accueil",
};

export default function Page() {
  return <YpiosLanding />;
}