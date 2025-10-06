import localFont from "next/font/local";
import { ReactQueryClientProvider } from "@/providers";
import Script from "next/script";
import "./globals.css";
import ClientLayout from "./ClientLayout";

// Fonts
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

// ✅ Metadata
export const metadata = {
  title: "RCCG Living Word Forney | A Place of Worship & Fellowship",
  description:
    "Welcome to RCCG Living Word Forney — a church dedicated to spreading the Gospel, worshipping together, and building strong families in Christ.",
  keywords:
    "RCCG Living Word Forney, Forney church, Christian fellowship, worship service, bible study, prayer, Jesus, community outreach",
  authors: [{ name: "RCCG Living Word Forney Media Team" }],
  openGraph: {
    title: "RCCG Living Word Forney | A Place of Worship & Fellowship",
    description:
      "Join us at RCCG Living Word Forney to experience powerful worship, biblical teaching, and a loving church family.",
    images: ["/LWF 2 Logo"], // 👈 replace with your church logo path
  },
  twitter: {
    card: "summary_large_image",
    title: "RCCG Living Word Forney",
    description:
      "Experience the presence of God through worship, prayer, and fellowship at RCCG Living Word Forney.",
    images: ["/LWF 2 Logo"], // 👈 replace with your church hero/banner image
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=6" },
      { url: "/favicon-32x32.png?v=6", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png?v=6", sizes: "16x16", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png?v=6", sizes: "180x180" },
  },
  manifest: "/site.webmanifest?v=6",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Organization Schema for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              url: "https://rccglivingwordforney.org/", // 👈 update with your church domain
              logo: "/church-logo.png", // 👈 exact logo URL
              name: "RCCG Living Word Forney",
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

        {/* Google Analytics / Ads Tag (optional, remove if not needed) */}
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
