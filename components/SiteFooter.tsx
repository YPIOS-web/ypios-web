import Link from "next/link";

const serviceLinks = [
  ["Climatisation", "/services/climatisation"],
  ["Ventilation", "/services/ventilation"],
  ["Plomberie", "/services/plomberie"],
  ["GTC / GTB", "/services/gtc-gtb"],
] as const;

export default function SiteFooter() {
  return (
    <footer className="bg-[#0D1B3D] text-white">
      <div className="ypios-container grid gap-10 py-12 md:grid-cols-[1.3fr_0.8fr_0.8fr] md:py-14">
        <div>
          <Link href="/" aria-label="YPIOS — Accueil" className="inline-block">
            <img
              src="/brand/ypios-logo-horizontal-dark.svg"
              alt="YPIOS"
              className="h-[48px] w-auto"
            />
          </Link>
          <p className="mt-5 max-w-md text-sm leading-6 text-white/72">
            Climatisation, ventilation, plomberie et GTB. Études, travaux, mise en service,
            maintenance et dépannage en Île-de-France.
          </p>
          <p className="mt-4 text-sm font-semibold tracking-wide text-[#00B7DB]">
            Your Problem Is Our Solution
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white/55">Expertises</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-white/78">
            {serviceLinks.map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="transition hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/realisations" className="transition hover:text-white">
                Réalisations
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white/55">Contact</h2>
          <div className="mt-4 space-y-2.5 text-sm leading-6 text-white/78">
            <a href="mailto:contact@ypios.fr" className="block transition hover:text-white">
              contact@ypios.fr
            </a>
            <p>2, rue des Hauts Sablons<br />91310 Leuville-sur-Orge</p>
            <Link href="/contact" className="inline-flex font-semibold text-[#FF8A1F] hover:text-[#FFA533]">
              Demander un devis →
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="ypios-container flex flex-col gap-3 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} YPIOS — Tous droits réservés.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link>
            <Link href="/politique-confidentialite" className="hover:text-white">Confidentialité</Link>
            <Link href="/cookies" className="hover:text-white">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
