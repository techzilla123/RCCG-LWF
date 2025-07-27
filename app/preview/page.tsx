'use client'; // if needed — but likely this file is a server component, so better to keep this part clean
import { usePathname } from 'next/navigation';
import Offer from "@/components/Offer";
import TopNavBar from "@/components/TopNavBar";
import ProductPage from "@/components/Users/Preview/ProductPage";
import SimilarProducts from "@/components/Users/Preview/SimilarProducts";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import BotpressChat from "@/components/BotpressChat"; 
 
export default function Home() {
   const pathname = usePathname();

  const shouldShowBotpress = pathname === '/preview'; 

  return (
    <div className="min-h-screen bg-white">
      <Offer />
      <TopNavBar />

      {/* Wrap the client-side components that use useSearchParams */}
      <Suspense fallback={<div className="p-4 text-center">Loading product...</div>}>
        <ProductPage />
      </Suspense>

      <Suspense fallback={<div className="p-4 text-center">Loading similar products...</div>}>
        <SimilarProducts />
      </Suspense>
{shouldShowBotpress && <BotpressChat />}
      <Footer />
    </div>
  );
}
