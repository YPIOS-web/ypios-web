// components/SmartImage.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Affiche la première image qui charge parmi `candidates`,
 * sinon essaie les suivantes en cas d'erreur (404).
 */
export default function SmartImage({
  candidates,
  alt,
  className,
  sizes,
  priority,
}: {
  candidates: string[];
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [i, setI] = useState(0);
  const src = candidates[i];
  if (!src) return null;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      priority={priority}
      onError={() => {
        if (i + 1 < candidates.length) setI(i + 1);
      }}
    />
  );
}