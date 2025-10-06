import type React from "react"
import BankInfo from "./BankInfo"

const LocalPayments: React.FC = () => {
  const bankData = [
    {
      logo: "https://api.builder.io/api/v1/image/assets/TEMP/c44db0ac278693dfb622a6e06498d195a83a9493?width=300",
      logoAlt: "GTCO Logo",
      logoClass: "relative rounded-3xl h-[150px] max-w-[150px] w-[150px] max-sm:h-[120px] max-sm:w-[120px]",
      hasWhiteBackground: false,
      details: [
        { label: "Offering:", value: "*737*32*Amount*2201#" },
        { label: "Tithe:", value: "*737*32*Amount*2202#" },
        { label: "A/C No:", value: "0019827596" },
        { label: "A/C Name:", value: "The Elevation Church" },
      ],
    },
    {
      logo: "https://api.builder.io/api/v1/image/assets/TEMP/c6f135fdcf28aef797be918757c9a6c4194962f0?width=300",
      logoAlt: "Zenith Bank Logo",
      logoClass: "relative rounded-3xl h-[150px] max-w-[150px] w-[150px] max-sm:h-[120px] max-sm:w-[120px]",
      hasWhiteBackground: true,
      details: [
        { label: "Offering:", value: "*996*6*Amount 35381*2#" },
        { label: "Tithe:", value: "*996*6*Amount 35381*1#" },
        { label: "A/C No:", value: "1013464441" },
        { label: "A/C Name:", value: "The Elevation Church" },
      ],
    },
    {
      logo: "https://api.builder.io/api/v1/image/assets/TEMP/541d1d4fa3d1d9d35ab5a4e3dbc5e147201d672e?width=300",
      logoAlt: "Access Bank Logo",
      logoClass: "relative rounded-3xl h-[200px] max-w-[150px] w-[150px] max-sm:h-[120px] max-sm:w-[120px]",
      hasWhiteBackground: true,
      details: [
        { label: "Offering & Tithe:", value: "*901*1*Amount*0705814476#" },
        { label: "A/C No:", value: "0705814476" },
        { label: "A/C Name:", value: "The Elevation Church" },
      ],
    },
  ]

  return (
    <section className="flex flex-col gap-6 items-start p-8 bg-slate-900 rounded-3xl w-full h-auto max-md:p-6">
      <header>
        <h2 className="text-2xl font-bold text-white mb-2">Local Payments</h2>
      </header>

      <div className="flex flex-col gap-6 w-full">
        {bankData.map((bank, index) => (
          <BankInfo key={index} {...bank} />
        ))}
      </div>
    </section>
  )
}

export default LocalPayments