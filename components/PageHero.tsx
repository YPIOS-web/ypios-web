// components/PageHero.tsx
import Image from "next/image";

type Props = {
  title: string;
  subtitle?: string;
  imageSrc: string;
  priority?: boolean;
};

export default function PageHero({ title, subtitle, imageSrc, priority }: Props) {
  return (
    <section
      className="relative w-full"
      style={{ marginTop: "calc(var(--header-height,72px) * -1)" }}
    >
      <div className="relative w-full h-[58vh] min-h-[460px] max-h-[720px]">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="100vw"
          priority={priority}
        />
        {/* Légère teinte pour lisibilité */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-3 max-w-3xl text-white/90">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}