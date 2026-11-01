import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name} · ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Imagem de compartilhamento (WhatsApp, LinkedIn…): logo, título do hero e stack.
export default function OpengraphImage() {
  const { before, highlight } = profile.headline;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#070b16",
          color: "#e8edf7",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 32, fontWeight: 700 }}>
          <svg width="64" height="64" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="9" fill="#2346d8" />
            <path
              d="M8.5 7v18h11M14.5 7l5 18 5-18"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="25.6" cy="25" r="1.9" fill="#f2d900" />
          </svg>
          {profile.name}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", fontSize: 88, fontWeight: 700, lineHeight: 1.04, letterSpacing: -3 }}>
          {before.split(" ").map((w, i) => (
            <span key={i} style={{ marginRight: 22 }}>
              {w}
            </span>
          ))}
          <span style={{ color: "#7ea2ff" }}>{highlight}</span>
          <span>.</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#8e99b3" }}>
          <span>{profile.role}</span>
          <span style={{ color: "#7ea2ff" }}>{profile.stack.join(" · ")}</span>
        </div>
      </div>
    ),
    size,
  );
}
