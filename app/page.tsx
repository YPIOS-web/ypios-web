import type { Metadata } from "next";
import HomePage from "@/components/HomePage";

export const metadata: Metadata = {
  title: { absolute: "YPIOS | Climatisation, ventilation, plomberie & GTB" },
  description:
    "YPIOS accompagne vos installations de climatisation, ventilation, plomberie et GTB : études, travaux, maintenance et dépannage en Île-de-France.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomePage />;
}
