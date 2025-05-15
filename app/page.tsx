// import Hero from "@/components/Hero";
import Offer from "@/components/Offer";
import TopNavBar from "@/components/TopNavBar";
import Hero from "@/components/Hero";
import Occasions from "@/components/Occasions";
import Heart from "@/components/Heart"
import New from "@/components/New"
import Category from "@/components/Category"
import ForAdults from "@/components/ForAdults"
import AboutSection from "@/components/AboutSection"
import Faq from "@/components/Faq"
import Offers from "@/components/Offers"
import Footer from "@/components/Footer"
import Reviews from "@/components/Reviews"


export default function Home() {
  return (
    <div className="min-h-scren bg-white">
      <Offer />
      <TopNavBar/>
      <Hero />
      <Occasions/>
      <Heart />
      <New/>
      <Category />
      <ForAdults />
      <AboutSection />
      <Faq/>
      <Reviews/>
      <Offers/>

      <Footer/>


      {/* <Footer />
     */}
    </div>
  );
}
