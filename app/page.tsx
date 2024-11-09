import Hero from "@/components/Hero";
import ForBusiness from "@/components/ForBusiness";
import ForCustomer from "@/components/ForCustomer";
import ContactForm from "@/components/ContactFormSect";
import Brands from "@/components/Brands";
import FaqSection from "@/components/FAQSection";
import Cta from "@/components/CtaAction";

import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div className="min-h-scren bg-white">
      <Hero />
      <Brands />
      
      <ForBusiness />
      <ForCustomer />
      <ContactForm />
      <FaqSection />
      
      <Cta />

      <Footer />
    
    </div>
  );
}
