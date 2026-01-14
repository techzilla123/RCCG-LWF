import type { Metadata } from "next";
import localFont from "next/font/local";
import { ReactQueryClientProvider } from "@/providers";
import Script from "next/script";
import "./globals.css";
import ClientLayout from "./ClientLayout";

/* =========================
   Fonts
========================= */
const coiny = localFont({
  src: "./fonts/Coiny-Regular.ttf",
  variable: "--font-coiny",
  weight: "400",
  style: "normal",
  display: "swap",
});

const inter = localFont({
  src: [
    { path: "./fonts/InterVariable.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/Inter-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Inter-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Inter-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "./fonts/InterDisplay-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

/* =========================
   SEO Metadata (FIXED)
========================= */
export const metadata: Metadata = {
  metadataBase: new URL("https://rccglivingwordforney.org"),

  alternates: {
    canonical: "/",
  },

  title: "RCCG Living Word Forney | A Place of Worship & Fellowship",
  description:
    "Welcome to RCCG Living Word Forney — a church dedicated to spreading the Gospel, worshipping together, and building strong families in Christ.",

  keywords: [
  "RCCG Living Word Forney",
  "Living Word Forney",
  "RCCG Living Word Parish",
  "RCCG Living Word Texas",
  "Redeemed Christian Church of God Forney",
  "RCCG church Forney",
  "RCCG Texas",
  "RCCG USA",
  "RCCG Living Word Church",
  "RCCG Living Word Worship Center",

  "church in Forney TX",
  "churches in Forney Texas",
  "Christian church in Forney",
  "best church in Forney TX",
  "local church in Forney",
  "Bible church Forney TX",
  "family church in Forney",
  "worship center in Forney TX",
  "Sunday church Forney",
  "church near me Forney TX",

  "Sunday worship service Forney",
  "midweek service Forney TX",
  "praise and worship Forney",
  "spirit filled church Forney",
  "Bible teaching church Forney",
  "Christian worship Texas",
  "church worship service",
  "worship and fellowship",
  "prayer and worship service",
  "church praise night",

  "prayer meeting Forney",
  "prayer service Texas",
  "Christian prayer group",
  "intercessory prayer church",
  "prayer ministry Forney",
  "fasting and prayer church",
  "healing prayer church",
  "breakthrough prayer service",
  "early morning prayer church",
  "prayer night Forney TX",

  "Bible study Forney TX",
  "Bible teaching church",
  "Christian Bible study group",
  "adult Bible study Forney",
  "youth Bible study Forney",
  "scripture teaching church",
  "word based church",
  "Christian discipleship church",
  "teaching ministry Texas",
  "gospel teaching church",

  "youth church Forney",
  "children church Forney TX",
  "family friendly church Texas",
  "marriage ministry church",
  "parenting Christian church",
  "youth fellowship Forney",
  "church for families Forney",
  "community church Texas",
  "church outreach Forney",
  "Christian family church",

  "church events Forney TX",
  "Christian events Forney",
  "worship events Texas",
  "church conference Texas",
  "revival service Forney",
  "church fellowship Forney",
  "Christian gathering Texas",
  "worship concert church",
  "prayer conference Texas",
  "Christian seminar Forney",

  "church giving online",
  "tithe and offering church",
  "donate to church Texas",
  "online church giving",
  "Christian ministry giving",
  "support church ministry",
  "church donation Forney",
  "seed sowing church",
  "kingdom giving ministry",
  "Christian charity church",

  "Christian church Texas",
  "gospel church USA",
  "Bible believing church",
  "Holy Spirit filled church",
  "Pentecostal church Texas",
  "evangelical church Texas",
  "faith based community",
  "church of Jesus Christ",
  "Christian worship community",
  "Christ centered church",

  "online church Forney",
  "livestream church Texas",
  "watch church service online",
  "online worship service",
  "church livestream Forney",
  "virtual church service",
  "Christian online fellowship",
  "church YouTube livestream",
  "online prayer service",
  "digital church community"
],

  authors: [{ name: "RCCG Living Word Forney Media Team" }],

  openGraph: {
    title: "RCCG Living Word Forney | A Place of Worship & Fellowship",
    description:
      "Join us at RCCG Living Word Forney to experience powerful worship, biblical teaching, and a loving church family.",
    url: "https://rccglivingwordforney.org/",
    siteName: "RCCG Living Word Forney",
    images: [
      {
        url: "/LWFLoga.png", // ✅ MUST exist in /public
        width: 1200,
        height: 630,
        alt: "RCCG Living Word Forney",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "RCCG Living Word Forney",
    description:
      "Experience the presence of God through worship, prayer, and fellowship at RCCG Living Word Forney.",
    images: ["/LWFLoga.png"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",
};

/* =========================
   Root Layout
========================= */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Church",
              name: "RCCG Living Word Forney",
              url: "https://rccglivingwordforney.org/",
              logo: "https://rccglivingwordforney.org/church-logo.png",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Forney",
                addressRegion: "TX",
                addressCountry: "US",
              },
              sameAs: [
                "https://www.facebook.com/rccglivingwordforney",
                "https://www.instagram.com/rccglivingwordforney",
                "https://www.youtube.com/@rccglivingwordforney",
              ],
            }),
          }}
        />
      </head>

      <body className={`${coiny.variable} ${inter.variable} antialiased`}>
        <ReactQueryClientProvider>
          <ClientLayout>{children}</ClientLayout>
        </ReactQueryClientProvider>

        {/* Google Analytics (optional) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </body>
    </html>
  );
}
