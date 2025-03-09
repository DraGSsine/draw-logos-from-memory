import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Draw Logos From Memory – Fun & Challenging Logo Drawing Game",
  description:
    "Think you know your favorite brands? Test your memory by drawing famous logos from scratch! Race against the clock and challenge your brand recognition skills!",
  openGraph: {
    title: "Draw Logos From Memory – Fun & Challenging Logo Drawing Game",
    description:
      "Think you know your favorite brands? Test your memory by drawing famous logos from scratch! Race against the clock and challenge your brand recognition skills!",
    url: "https://draw-logos-from-memory.site/",
    siteName: "Draw Logos From Memory",
    images: [
      {
        url: "/public/logo.png",
        width: 1200,
        height: 630,
        alt: "Draw Logos From Memory - Fun Drawing Game",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Draw Logos From Memory – Fun & Challenging Logo Drawing Game",
    description:
      "Put your brand knowledge to the test! Try drawing famous logos from memory in 60 seconds. Play now and see how well you remember iconic brands!",
    images: ["/public/logo.png"],
  },
  icons: {
    icon: "/public/logo.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Your Name" />
        <link rel="icon" href="/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Draw Logos From Memory",
              url: "https://draw-logos-from-memory.site/",
              description:
                "Test your brand recognition skills by drawing famous logos from memory in just 60 seconds!",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
