"use client";

import ChurchHeader from "@/components/Header/ChurchHeader";
import Background from "@/components/Give/Hero/Background";
import PaymentContainer from "@/components/Give/Payment/PaymentContainer";
import WhyGive from "@/components/Give/Why/WhyGive";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-white">
      <header className="relative z-50">
        <ChurchHeader />
      </header>

      <section className="relative z-10">
        <Background />
      </section>

      <section className="relative z-20 bg-white ">
        <PaymentContainer />
      </section>

      <section className="relative z-10">
        <WhyGive />
      </section>
    </div>
  );
}
