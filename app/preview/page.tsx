// import Hero from "@/components/Hero";
import Offer from "@/components/Offer";
import TopNavBar from "@/components/TopNavBar";
import ProductPage from "@/components/Users/Preview/ProductPage"
import SimilarProducts from "@/components/Users/Preview/SimilarProducts"




import Footer from "@/components/Footer"


// import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div className="min-h-scren bg-white">
      <Offer />
      <TopNavBar/>
      <ProductPage/>
      <SimilarProducts/>
     
    
      <Footer/>


      {/* <Footer />
     */}
    </div>
  );
}
