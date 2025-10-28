// components/TopNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/services/ventilation", label: "Ventilation" },
  { href: "/services/plomberie", label: "Plomberie" },
  { href: "/services/climatisation", label: "Climatisation" },
  { href: "/services/gtc-gtb", label: "GTC/GTB" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/contact", label: "Contact" },
];

export default function TopNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const actives = useMemo(() => {
    const map = new Map<string, boolean>();
    for (const l of links) {
      if (l.href === "/") {
        map.set(l.href, pathname === "/");
      } else {
        map.set(l.href, pathname === l.href || pathname?.startsWith(l.href + "/"));
      }
    }
    return map;
  }, [pathname]);

  return (
    <div className="fixed inset-x-0 top-4 z-50 flex justify-center pointer-events-none">
      {/* Sur la Home => pas de fond ni blur ; ailleurs => pastille translucide */}
      <nav
        aria-label="Navigation principale"
        className={[
          "pointer-events-auto max-w-full overflow-x-auto no-scrollbar",
          isHome
            ? // Home: fond retiré
              "px-2 py-1.5 bg-transparent backdrop-blur-0 ring-0 shadow-none"
            : // Autres pages: fond translucide (rendu actuel)
              "rounded-full bg-black/55 px-2 py-1.5 shadow-md ring-1 ring-white/10 backdrop-blur-sm",
        ].join(" ")}
      >
        <ul className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => {
            const isActive = actives.get(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={[
                    "block rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition",
                    isActive ? "text-white" : "text-white/90 hover:text-white",
                  ].join(" ")}
                  aria-current={isActive ? "page" : undefined}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}