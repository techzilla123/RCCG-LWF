// import Hero from "@/components/Hero";
"use client"
import { usePathname } from 'next/navigation';
import Offer from "@/components/Offer";
import TopNavBar from "@/components/TopNavBar";
import Header from "@/components/Users/Header"
import { Shop } from "@/components/Users/Shop"
import { Suspense } from "react";
import Footer from "@/components/Footer"
import BotpressChat from "@/components/BotpressChat"; 

// import Footer from "@/components/Footer";


export default function Home() {

    const pathname = usePathname();

  const shouldShowBotpress = pathname === '/shop'; 

  return (
    <div className="min-h-scren bg-white">
      <Offer />
      <TopNavBar/>
      <Suspense fallback={<div>Loading...</div>}>
      <Header/>
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
      <Shop/>
      </Suspense>
       {shouldShowBotpress && <BotpressChat />}

      <Footer/>


      {/* <Footer />
     */}
    </div>
  );
}
