// import Hero from "@/components/Hero";
import Offer from "@/components/Offer";
import TopNavBar from "@/components/TopNavBar";
import WishHeader from "@/components/Users/WishHeader"
import { Wishlist } from "@/components/Users/Wishlist"
import BotpressChat from "@/components/BotpressChat"; 



import Footer from "@/components/Footer"

// import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div className="min-h-scren bg-white">
      <Offer />
      <TopNavBar/>
      <WishHeader/>
      <Wishlist/>
      
    <BotpressChat />

      <Footer/>


      {/* <Footer />
     */}
    </div>
  );
}
