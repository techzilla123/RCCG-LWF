import Offer from "@/components/Offer";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { InvoiceDetails } from "@/components/Users/Cart/Success/InvoiceDetails";

// Properly centered error icon
const ErrorIcon = () => (
  <div className="w-24 h-24 mx-auto rounded-full bg-red-100 flex items-center justify-center">
    <svg
      className="w-12 h-12 text-red-600"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </div>
);

export default function FailedPaymentPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <Offer />
      <TopNavBar />

      <div className="flex flex-1 justify-center items-center">
        <main className="flex flex-col py-10 max-w-[539px] w-full px-4">
          <ErrorIcon />

          <section className="flex flex-col items-center text-center mt-6">
            <h1 className="text-4xl text-red-600 font-semibold">Payment Failed</h1>
            <p className="mt-2 text-lg text-neutral-500">
              Something went wrong. Please try again or return to your cart.
            </p>
          </section>

          {/* Show invoice regardless of status */}
          <div className="mt-5">
            <InvoiceDetails />
          </div>

          {/* Retry Button */}
          <div className="mt-6 flex justify-center">
            <Link href="/cart">
              <button className="px-6 py-3 text-white bg-red-500 rounded-full hover:bg-red-600 transition">
                Return to Cart
              </button>
            </Link>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
