"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/services/climatisation", label: "Climatisation" },
  { href: "/services/ventilation", label: "Ventilation" },
  { href: "/services/plomberie", label: "Plomberie" },
  { href: "/services/gtc-gtb", label: "GTC / GTB" },
  { href: "/realisations", label: "Réalisations" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="ypios-container flex h-[82px] items-center justify-between gap-6 max-sm:h-[72px]">
        <Link href="/" className="shrink-0" aria-label="YPIOS — Accueil">
          <img
            src="/brand/ypios-logo-horizontal.svg"
            alt="YPIOS"
            className="h-[42px] w-auto max-sm:h-[36px]"
          />
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href || pathname?.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-[#0D1B3D] text-white"
                    : "text-slate-700 hover:bg-slate-100 hover:text-[#0D1B3D]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center lg:flex">
          <Link href="/contact" className="ypios-button-primary">
            Nous contacter
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-[#0D1B3D] lg:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex w-5 flex-col gap-1.5">
            <span className={`h-0.5 w-full bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-full bg-current transition ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-full bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="ypios-container py-4" aria-label="Navigation mobile">
            <div className="grid gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#0D1B3D]"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/contact" className="ypios-button-primary mt-2 w-full">
                Nous contacter
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
