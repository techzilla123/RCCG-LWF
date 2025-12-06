import React, { useState } from "react"
import BankInfo from "./BankInfo"

const LocalPayments: React.FC = () => {
  const [selectedQR, setSelectedQR] = useState<string | null>(null)

  const paymentData = [
    {
    logo: "https://www.citypng.com/public/uploads/preview/zelle-round-logo-icon-png-701751694968675lxmjumweha.png",
    logoAlt: "Zelle Logo",
    logoClass:
      "relative rounded-3xl h-[150px] max-w-[150px] w-[150px] max-sm:h-[120px] max-sm:w-[120px]",
    hasWhiteBackground: false,
    details: [
      { label: "Name:", value: "RCCG LIVING WORD FORNEY" },
      { label: "Email:", value: "livingwordforney@gmail.com" },
    ],
    qrCode:
      "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=livingwordforney@gmail.com",
  },
  {
    logo:
      "https://static.vecteezy.com/system/resources/previews/067/065/659/non_2x/cashapp-logo-square-rounded-cashapp-logo-free-download-cashapp-logo-free-png.png",
    logoAlt: "Cash App Logo",
    logoClass:
      "relative rounded-3xl h-[150px] max-w-[150px] w-[150px] max-sm:h-[120px] max-sm:w-[120px]",
    hasWhiteBackground: false,
    details: [
      { label: "Cash Tag:", value: "$RCCGLWF" },
    ],
    qrCode:
      "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=%24RCCGLWF",
  },
    {
      logo: "https://cdn-icons-png.flaticon.com/512/2867/2867634.png",
      logoAlt: "Cheque Icon",
        logoClass: "relative rounded-3xl h-[150px] max-w-[150px] w-[150px] max-sm:h-[120px] max-sm:w-[120px]",
      hasWhiteBackground: false,
      details: [
        { label: "Payable To:", value: "RCCG Living Word Forney" },
        { label: "Mail To:", value: "RCCG Living Word Forney, [Insert Church Address]" },
        { label: "Memo:", value: "Offering / Tithe / Donation" },
      ],
    },
  ]

  return (
    <section className="flex flex-col gap-6 items-start p-8 bg-slate-900 rounded-3xl w-full h-auto max-md:p-6">
      <header>
        <h2 className="text-2xl font-bold text-white mb-2">Local Payments</h2>
      </header>

      <div className="flex flex-col gap-6 w-full">
        {paymentData.map((method, index) => (
          <div key={index} className="relative">
            <BankInfo {...method} />

            {/* Show QR code link for the first two methods */}
            {method.qrCode && (
              <button
                onClick={() => setSelectedQR(method.qrCode)}
                className="text-blue-400 text-sm mt-2 underline hover:text-blue-300"
              >
                View QR Code
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Modal Overlay for QR Code */}
      {selectedQR && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedQR(null)}
        >
          <div
            className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedQR} alt="Payment QR Code" className="w-48 h-48 mb-4" />
            <button
              onClick={() => setSelectedQR(null)}
              className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default LocalPayments
