import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteTitle = "RHI6900 | Robin Hood Index";
const siteDescription =
  "A neon Robin Hood-style holder airdrop index for RHI6900, conviction coins, RWA assets, and meme-belt crypto exposure.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") || host.startsWith("127.0.0.1")
      ? "http"
      : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: siteTitle,
    description: siteDescription,
    openGraph: {
      title: siteTitle,
      description:
        "Hold RHI6900 and follow a neon custom Robin Hood index with a dashboard, RWA sleeve, and meme conveyor.",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "RHI6900 Robin Hood Index social preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description:
        "A holder airdrop index for coins we are in, RWA rails, and a meme conveyor belt.",
      images: ["/og.png"],
    },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#e8ff17",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
