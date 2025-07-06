// import Hero from "@/components/Hero";
import Offer from "@/components/Offer";
import TopNavBar from "@/components/TopNavBar";
import Header from "@/components/Users/Shop/Holiday/Header"
import { Shop } from "@/components/Users/Shop"
import { Suspense } from "react";
import BotpressChat from "@/components/BotpressChat"; 


import Footer from "@/components/Footer"

// import Footer from "@/components/Footer";


export default function Home() {
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
     <BotpressChat />

      <Footer/>


      {/* <Footer />
     */}
    </div>
  );
}
