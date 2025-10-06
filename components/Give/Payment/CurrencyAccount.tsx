import type React from "react"

interface CurrencyAccountProps {
  symbol: string
  label: string
  accountNumber: string
}

const CurrencyAccount: React.FC<CurrencyAccountProps> = ({ symbol, label, accountNumber }) => {
  return (
    <div className="flex relative items-center self-stretch max-md:flex-col max-md:gap-4 max-md:items-start">
      <div className="flex relative flex-col items-start flex-[1_0_0]">
        <div className="flex relative flex-col items-start self-stretch">
          <h4 className="relative self-stretch text-2xl font-bold leading-9 text-white max-sm:text-xl max-sm:leading-7">
            {label}
          </h4>
        </div>
        <div className="flex relative flex-col items-start self-stretch pb-12">
          <p className="relative self-stretch text-3xl font-bold leading-7 text-white max-sm:text-2xl max-sm:leading-7">
            {accountNumber}
          </p>
        </div>
      </div>

      <div className="flex relative flex-col items-start pl-2.5 max-md:self-center">
        <div className="flex relative items-start">
          <div className="flex relative flex-col items-center self-stretch px-6 pt-7 pb-7 bg-slate-900 rounded-[50.97px] max-sm:p-5">
            <div className="flex relative justify-center items-center py-0 pr-2.5 pl-2.5 h-[50px] max-w-[100px] w-[50px]">
              <div className="flex absolute top-0 flex-col shrink-0 items-center w-7 h-[50px] left-[11px]">
                <span className="relative text-5xl text-center text-white leading-[50px] max-sm:text-4xl">
                  {symbol}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrencyAccount
