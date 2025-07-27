"use client"
// import Hero from "@/components/Hero";
import { usePathname } from 'next/navigation';
import Offer from "@/components/Offer";
import TopNavBar from "@/components/TopNavBar";
import Header from "@/components/Users/Settings/Header"
import BotpressChat from "@/components/BotpressChat"; 
 



import Footer from "@/components/Footer"

// import Footer from "@/components/Footer";


export default function Home() {
  const pathname = usePathname();

  const shouldShowBotpress = pathname === '/settings'; 


  return (
    <div className="min-h-scren bg-white">
      <Offer />
      <TopNavBar/>
      <Header/>
     
       {shouldShowBotpress && <BotpressChat />}
    

      <Footer/>


      {/* <Footer />
     */}
    </div>
  );
}
