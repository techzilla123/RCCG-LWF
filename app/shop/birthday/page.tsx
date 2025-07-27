"use client"
// import Hero from "@/components/Hero";
import { usePathname } from 'next/navigation';
import Offer from "@/components/Offer";
import TopNavBar from "@/components/TopNavBar";
import Header from "@/components/Users/Shop/Birthday/Header"
import { Shop } from "@/components/Users/Shop"
import { Suspense } from "react";

import BotpressChat from "@/components/BotpressChat"; 
 
import Footer from "@/components/Footer"

// import Footer from "@/components/Footer";


export default function Home() {
   const pathname = usePathname();

  const shouldShowBotpress = pathname === '/shop/birthday'; 

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
