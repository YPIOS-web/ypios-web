// components/HeroBanner.tsx
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** Contenu optionnel centré dans le bandeau (titres, etc.) */
  children?: React.ReactNode;
  /** Hauteur (vh). Par défaut 72vh. */
  heightVh?: number;
};

export default function HeroBanner({ src, alt, children, heightVh = 72 }: Props) {
  return (
    <section
      className="relative w-full"
      style={{ height: `min(${heightVh}vh, 820px)` }} // plein écran “raisonnable”
      aria-label={alt}
    >
      {/* Image plein écran, derrière le header (qui est fixed) */}
      <Image src={src} alt={alt} fill priority className="object-cover" sizes="100vw" />

      {/* Dégradé de lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/10" />

      {/* Contenu centré si fourni */}
      {children ? (
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          {children}
        </div>
      ) : null}
    </section>
  );
}