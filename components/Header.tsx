// components/Header.tsx
"use client";

import Link from "next/link";

export default function Header() {
  const links: { href: string; label: string }[] = [
    { href: "/", label: "Accueil" },
    { href: "/services/ventilation", label: "Ventilation" },
    { href: "/services/plomberie", label: "Plomberie" },
    { href: "/services/climatisation", label: "Climatisation" },
    { href: "/services/gtc-gtb", label: "GTC/GTB" },
    { href: "/realisations", label: "Réalisations" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <nav className="rounded-full bg-black/30 backdrop-blur-md px-4 py-2 ring-1 ring-white/15">
        <ul className="flex items-center gap-4 text-sm text-white">
          {links.map((l) => (
            <li key={l.href}>
              <Link className="hover:underline underline-offset-4" href={l.href}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}