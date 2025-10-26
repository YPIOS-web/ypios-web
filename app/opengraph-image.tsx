// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  const blue = "#1b4d9b";
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          background:
            "linear-gradient(135deg, #0f1b2e 0%, #112342 30%, #1b4d9b 100%)",
          color: "white",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, 'Helvetica Neue', Arial",
        }}
      >
        {/* Bande latérale “technique” */}
        <div style={{ width: "28%", height: "100%", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: 0, left: 0, bottom: 0, right: 0,
              background:
                "radial-gradient(1200px 600px at -10% 50%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 60%)",
            }}
          />
          {/* Carrés “panneau électrique” */}
          <div style={{ position: "absolute", top: 70, left: 60, display: "grid", gap: 10 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{
                width: 90, height: 54, borderRadius: 8,
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)"
              }}/>
            ))}
          </div>
        </div>

        {/* Contenu principal */}
        <div style={{ flex: 1, padding: "56px 72px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {/* Logo “rond” */}
          <div
            style={{
              width: 84, height: 84, borderRadius: 9999,
              background: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 18,
            }}
          >
            <div style={{
              width: 46, height: 46, borderRadius: 8, background: blue,
              display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
              fontWeight: 800, fontSize: 28, letterSpacing: 0.5
            }}>
              Y
            </div>
          </div>

          <div style={{ fontSize: 54, fontWeight: 800, lineHeight: 1.1 }}>
            YPIOS Energie
          </div>

          <div style={{ fontSize: 34, fontWeight: 700, opacity: 0.98, marginTop: 8 }}>
            Climatisation, Ventilation et Plomberie
          </div>

          <div style={{ fontSize: 24, marginTop: 14, opacity: 0.9 }}>
            Installation, entretien & maintenance — tertiaire • industriel • résidentiel
          </div>

          <div style={{ fontSize: 18, marginTop: 22, opacity: 0.8 }}>
            Île-de-France • contact@ypios.fr
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}