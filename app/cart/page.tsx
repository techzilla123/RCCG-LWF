// import Hero from "@/components/Hero";
import Offer from "@/components/Offer";
import TopNavBar from "@/components/TopNavBar";
import CartHeader from "@/components/Users/CartHeader"
import  CartItem  from "@/components/Users/CartItem"



import Footer from "@/components/Footer"

// import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div className="min-h-scren bg-white">
      <Offer />
      <TopNavBar/>
      <CartHeader/>
      <CartItem/>
      
    

      <Footer/>


      {/* <Footer />
     */}
    </div>
  );
}
