'use client'
// import Footer from "@/components/Footer"
import ChurchHeader from "@/components/Header/ChurchHeader"
import MinistrySection from "@/components/Ministries/MinistrySection"
import EventsSection from "@/components/Events/EventsSection"
import MovementSection from "@/components/Hero/MovementSection"

import GetConnected from "@/components/Connected/GetConnected" 
import Background from "@/components/Learn/Background" 
import MediaSection from "@/components/Media/MediaSection" 
import Footer from "@/components/Footer/Footer"



export default function Home() {
  

  return (
   <div className="min-h-screen bg-white relative w-full max-w-full sm:max-w-none overflow-hidden">


      <ChurchHeader />
      <MovementSection />
      <EventsSection />
      <MinistrySection />
      <GetConnected />
      <Background />
      <MediaSection />
      <Footer />
      
      
    </div>
  )
}
