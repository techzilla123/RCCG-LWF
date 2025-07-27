'use client';

import { usePathname } from 'next/navigation';
import Offer from "@/components/Offer";
import TopNavBar from "@/components/TopNavBar";
import WishHeader from "@/components/Users/WishHeader";
import { Wishlist } from "@/components/Users/Wishlist";
import BotpressChat from "@/components/BotpressChat";
import Footer from "@/components/Footer";

export default function Home() {
  const pathname = usePathname();

  const shouldShowBotpress = pathname === '/wishlist'; // adjust based on actual route

  return (
    <div className="min-h-screen bg-white">
      <Offer />
      <TopNavBar />
      <WishHeader />
      <Wishlist />

      {shouldShowBotpress && <BotpressChat />}

      <Footer />
    </div>
  );
}
