'use client'
// import Footer from "@/components/Footer"
import ChurchHeaderb from "@/components/Header/ChurchHeaderb"
import BlogPage from "@/components/Blog/BlogPage"
// import EventsSection from "@/components/Events/EventsSection"
// import MovementSection from "@/components/Hero/MovementSection"
// import GetConnected from "@/components/Connected/GetConnected" 
// import Background from "@/components/Learn/Background" 
// import MediaSection from "@/components/Media/MediaSection" 



export default function Home() {
  

  return (
   <div className="min-h-screen -mt[20px] bg-white relative w-full max-w-full sm:max-w-none overflow-hidden">


      <ChurchHeaderb />
      <BlogPage />
      {/* <EventsSection />
      <MovementSection />
      <GetConnected />
      <Background />
      <MediaSection /> */}
      
      
      
    </div>
  )
}
