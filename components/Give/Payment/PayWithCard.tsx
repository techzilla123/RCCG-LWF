import type React from "react"

const PayWithCard: React.FC = () => {
  return (
    <section className="flex flex-col gap-6 items-start p-8 bg-teal-100 rounded-3xl w-full h-auto max-md:p-6">
      <h2 className="text-2xl font-bold text-slate-900">Pay With Card</h2>
      <p className="text-base text-neutral-600">
        We offer convenient and secure ways to make credit and debit card payments. Please select your preferred option below:
      </p>

      {/* SIDE BY SIDE on desktop, STACKED on mobile */}
      <div className="flex flex-row flex-wrap md:flex-nowrap justify-between items-center gap-8 w-full">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/3823fe909b5d03a41b0649bb089b0e076823e333?width=536"
          alt="Stripe"
          className="rounded-xl w-full md:w-1/2 h-auto object-contain transition-transform duration-300 hover:scale-105"
        />
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/1898b4c2d5dd27c6a9345d848d5997b8254e4a6e?width=536"
          alt="PayPal"
          className="rounded-xl w-full md:w-1/2 h-auto object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>
    </section>
  )
}

export default PayWithCard
