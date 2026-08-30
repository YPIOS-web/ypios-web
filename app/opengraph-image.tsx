import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "YPIOS — Climatisation, ventilation, plomberie et GTB en Île-de-France";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "76px 88px",
          background: "linear-gradient(135deg, #0D1B3D 0%, #122B55 58%, #006D9A 100%)",
          color: "white",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: 8 }}>YPIOS</div>
        <div style={{ width: 96, height: 6, borderRadius: 99, background: "#FF7A00", marginTop: 28 }} />
        <div style={{ fontSize: 40, fontWeight: 700, marginTop: 34 }}>
          Climatisation · Ventilation · Plomberie · GTB
        </div>
        <div style={{ fontSize: 26, marginTop: 22, opacity: 0.86 }}>
          Études, travaux, maintenance et dépannage — Île-de-France
        </div>
        <div style={{ fontSize: 22, marginTop: 46, color: "#6FE3F4" }}>
          Your Problem Is Our Solution
        </div>
      </div>
    ),
    size,
  );
}
