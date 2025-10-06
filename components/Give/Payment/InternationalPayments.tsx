import type React from "react"
import CurrencyAccount from "./CurrencyAccount"

const InternationalPayments: React.FC = () => {
  const currencyAccounts = [
    { symbol: "$", label: "($) USD Account:", accountNumber: "0019827709" },
    { symbol: "£", label: "(£) GBP Account:", accountNumber: "0019827716" },
    { symbol: "€", label: "(€) Euro Account:", accountNumber: "0019827723" },
  ]

  return (
    <section className="flex flex-col gap-6 p-8 bg-sky-800 rounded-3xl w-full h-auto max-md:p-6">
      <h2 className="text-2xl font-bold text-white">Int'l Payments</h2>

      <div className="flex flex-wrap justify-between items-center gap-6">
        <div>
          <h3 className="text-xl font-bold text-white">Swift Code:</h3>
          <p className="text-3xl font-bold text-white">GTBINGLA</p>
        </div>
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/ad429bbc5311bb8d1798b634c8017b30014f56fb?width=212"
          alt="GTCO Logo"
          className="h-[90px] w-auto"
        />
      </div>

      <div>
        <h3 className="text-xl font-bold text-white">Account Name:</h3>
        <p className="text-2xl font-bold text-white mb-6">The Elevation Church</p>
      </div>

      <div className="flex flex-col gap-4">
        {currencyAccounts.map((account, index) => (
          <CurrencyAccount key={index} {...account} />
        ))}
      </div>
    </section>
  )
}

export default InternationalPayments
