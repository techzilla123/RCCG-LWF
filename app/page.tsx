"use client";
import * as React from "react";

import ChurchHeader from "@/components/Header/ChurchHeader";
import MovementSection from "@/components/Hero/MovementSection";
import EventsSection from "@/components/Events/EventsSection";
import MinistrySection from "@/components/Ministries/MinistrySection";
import GetConnected from "@/components/Connected/GetConnected";
import Background from "@/components/Learn/Background";
import MediaSection from "@/components/Media/MediaSection";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <div
      className="
        min-h-screen bg-white w-full overflow-y-auto overflow-x-hidden
        scroll-smooth snap-y snap-mandatory
      "
      style={{ scrollBehavior: "smooth" }}
    >
      <div className="snap-start">
        <ChurchHeader />
      </div>

     
        <MovementSection />
  

      <div className="snap-start">
        <EventsSection />
      </div>

      <div className="snap-start">
        <MinistrySection />
      </div>

      <div className="snap-start">
        <GetConnected />
      </div>

      <div className="snap-start">
        <Background />
      </div>

      <div className="snap-start">
        <MediaSection />
      </div>

      <div className="snap-start">
        <Footer />
      </div>
    </div>
  );
}
