// import Hero from "@/components/Hero";
import Offer from "@/components/Offer";
import TopNavBar from "@/components/TopNavBar";
import Header from "@/components/Users/Shop/Decorations/Header"
import { Shop } from "@/components/Users/Shop"



import Footer from "@/components/Footer"

// import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div className="min-h-scren bg-white">
      <Offer />
      <TopNavBar/>
      <Header/>
      <Shop/>
      
    

      <Footer/>


      {/* <Footer />
     */}
    </div>
  );
}
