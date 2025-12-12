import type React from "react";
import CurrencyAccount from "./CurrencyAccount";

const InternationalPayments: React.FC = () => {
  const currencyAccounts = [
    { symbol: "$", label: "($) USD Account:", accountNumber: "770751110" },

    {
      symbol: "🏦",
      label: (
        <>
          Routing Number <br />
          (Direct Deposit & ACH):
        </>
      ),
      accountNumber: "111000614",
    },

    {
      symbol: "💳",
      label: (
        <>
          Routing Number <br />
          (Wire Transfers):
        </>
      ),
      accountNumber: "021000021",
    },
  ];

  return (
    <section className="flex flex-col gap-6 p-8 bg-sky-800 rounded-3xl w-full h-auto max-md:p-6">
      <h2 className="text-2xl font-bold text-white">Int&apos;l Payments</h2>

      <div className="flex flex-wrap justify-between items-center gap-6">
        <div>
          <h3 className="text-xl font-bold text-white">Bank:</h3>
          <p className="text-3xl font-bold text-white">CHASE BANK</p>
        </div>
        <img
          src="https://logos-world.net/wp-content/uploads/2020/11/Chase-Emblem.png"
          alt="CHASE Logo"
          className="h-[90px] w-auto"
        />
      </div>

      <div>
        <h3 className="text-xl font-bold text-white">Account Name:</h3>
        <p className="text-2xl font-bold text-white mb-6">RCCG Living World Forney</p>
      </div>

      <div className="flex flex-col gap-4">
        {currencyAccounts.map((account, index) => (
          <CurrencyAccount key={index} {...account} />
        ))}
      </div>
    </section>
  );
};

export default InternationalPayments;
