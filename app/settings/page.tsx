// import Hero from "@/components/Hero";
import Offer from "@/components/Offer";
import TopNavBar from "@/components/TopNavBar";
import Header from "@/components/Users/Settings/Header"
import BotpressChat from "@/components/BotpressChat"; 
 



import Footer from "@/components/Footer"

// import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div className="min-h-scren bg-white">
      <Offer />
      <TopNavBar/>
      <Header/>
     
      <BotpressChat />
    

      <Footer/>


      {/* <Footer />
     */}
    </div>
  );
}
