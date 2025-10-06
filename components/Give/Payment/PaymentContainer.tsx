import type React from "react"
import LocalPayments from "./LocalPayments"
import InternationalPayments from "./InternationalPayments"

const PaymentContainer: React.FC = () => {
  return (
    <main className="min-h-screen flex justify-center items-start bg-slate-100 py-6 px-4 md:px-8 lg:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full">
        <LocalPayments />
        <InternationalPayments />
      </div>
    </main>
  )
}

export default PaymentContainer
