"use client"

import { usePathname } from 'next/navigation';
import Offer from "@/components/Offer";
import TopNavBar from "@/components/TopNavBar";
import Header from "@/components/Users/Rentals/Header"
import { Shop } from "@/components/Users/Shop"
import { Suspense } from "react";
import BotpressChat from "@/components/BotpressChat"; 
import Footer from "@/components/Footer"
import Script from "next/script";

export default function Home() {

  const pathname = usePathname();
  const shouldShowBotpress = pathname === '/rentals'; 

  return (
    <div className="min-h-screen bg-white">
      {/* Google Tag (gtag.js) */}
      <Script 
        src="https://www.googletagmanager.com/gtag/js?id=AW-17512936136" 
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17512936136');
        `}
      </Script>

      <Offer />
      <TopNavBar/>
      <Suspense fallback={<div>Loading...</div>}>
        <Header/>
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Shop />
      </Suspense>

      {shouldShowBotpress && <BotpressChat />}

      <Footer />
    </div>
  );
}
