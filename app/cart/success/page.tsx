import Hero from "@/components/Hero";
import Offer from "@/components/Offer";
import TopNavBar from "@/components/TopNavBar";
import { SuccessIcon } from "@/components/Users/Cart/Success/SuccessIcon";
import { InvoiceDetails } from "@/components/Users/Cart/Success/InvoiceDetails";
import { ActionButton } from "@/components/Users/Cart/Success/ActionButton";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <Offer />
      <TopNavBar />
      

      <div className="flex flex-1 justify-center items-center">
        <main className="flex flex-col py-10 max-w-[539px] w-full">
          <SuccessIcon />

          <section className="flex flex-col items-center text-center mt-6">
            <h1 className="text-4xl text-black">
              Payment successful!
            </h1>
            <p className="mt-2 text-xl tracking-normal leading-8 text-neutral-500">
              Your order has been confirmed and payment successful.
            </p>
          </section>

          <InvoiceDetails />
          <ActionButton />
        </main>
      </div>

      <Footer />
    </div>
  );
}
