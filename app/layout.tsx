import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import "./globals.css";
import "./site.css";

const display = Big_Shoulders({
  variable: "--font-tv-display",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const text = Hanken_Grotesk({
  variable: "--font-tv-text",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// Na Vercel a URL de produção vem sozinha; dá para fixar com NEXT_PUBLIC_SITE_URL.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const title = `${profile.name} · ${profile.role}`;
const description = profile.intro;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  authors: [{ name: profile.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: profile.name,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef2f8" },
    { media: "(prefers-color-scheme: dark)", color: "#070b16" },
  ],
};

// Antes de pintar: marca que há JS e aplica o tema escolhido (claro/escuro) para não piscar.
const boot = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('lv-theme');if(t==='light'||t==='dark')d.dataset.theme=t}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${text.variable} ${mono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <div className="tv">{children}</div>
      </body>
    </html>
  );
}
