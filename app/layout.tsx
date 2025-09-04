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
  title: "Party Place and Rentals",
  description: "Shop the moments that keep You & Your kids smiling...",
  keywords: "Party Place and Rentals, Shop, Balloon, Decor",
  authors: [{ name: "Techzilla" }],
  openGraph: {
    title: "Party Place and Rentals",
    description: "Shop the moments that keep You & Your kids smiling...",
    images: ["https://partyplaceandrentals.com/favicon-v3.ico"], // 👈 use your new logo here
  },
  twitter: {
    card: "summary_large_image",
    title: "Party Place and Rentals",
    description: "Shop the moments that keep You & Your kids smiling...",
   images: ["/hero.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-v3.ico?v=6" },
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
              url: "https://partyplaceandrentals.com/",
              logo: "https://partyplaceandrentals.com/favicon-v3.ico", // 👈 exact logo URL
              name: "Party Place and Rentals",
            }),
          }}
        />
      </head>
      <body className={`${coiny.variable} ${inter.variable} antialiased`}>
        <ReactQueryClientProvider>
          <ClientLayout>{children}</ClientLayout>
        </ReactQueryClientProvider>

        {/* Google Ads Tag */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17512936136"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17512936136');
          `}
        </Script>
      </body>
    </html>
  );
}
