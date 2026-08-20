import { ImageResponse } from "next/og";
import { NOTA_GERAL, SLOGAN } from "@/data/lojas";

// obrigatório no output: "export" (build:pages)
export const dynamic = "force-static";

export const alt =
  "Fina Fauna Rações, pet shop em Petrópolis com unidades na Posse e em Pedro do Rio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #086953 0%, #044D3D 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "88px",
              height: "88px",
              borderRadius: "999px",
              background: "#E8521E",
              fontSize: "44px",
            }}
          >
            🐾
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "54px", fontWeight: 800, color: "#FFFFFF" }}>
              Fina Fauna
            </div>
            <div
              style={{
                fontSize: "22px",
                fontWeight: 700,
                letterSpacing: "14px",
                color: "#D88D4B",
              }}
            >
              RAÇÕES
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "56px",
            fontSize: "58px",
            fontWeight: 800,
            lineHeight: 1.15,
            color: "#FFFFFF",
            maxWidth: "900px",
          }}
        >
          {SLOGAN}
        </div>

        <div
          style={{
            marginTop: "48px",
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              background: "#E8521E",
              color: "#FFFFFF",
              borderRadius: "999px",
              padding: "14px 30px",
              fontSize: "26px",
              fontWeight: 700,
            }}
          >
            Posse · Pedro do Rio
          </div>
          <div
            style={{
              display: "flex",
              background: "rgba(255,255,255,0.12)",
              color: "#FFF8F0",
              borderRadius: "999px",
              padding: "14px 30px",
              fontSize: "26px",
              fontWeight: 700,
            }}
          >
            ⭐ {NOTA_GERAL.nota.toLocaleString("pt-BR")} no Google
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
