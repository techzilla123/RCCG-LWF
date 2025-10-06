import type React from "react"

interface BankDetail {
  label: string
  value: string
}

interface BankInfoProps {
  logo: string
  logoAlt: string
  logoClass: string
  hasWhiteBackground: boolean
  details: BankDetail[]
}

const BankInfo: React.FC<BankInfoProps> = ({ logo, logoAlt, logoClass, hasWhiteBackground, details }) => {
  return (
    <article className="flex relative gap-5 items-center self-stretch px-0 pt-4 pb-4 max-md:flex-col max-md:gap-4 max-md:items-start">
      <div className="flex relative flex-col items-start max-w-[668px] max-md:self-center">
        {hasWhiteBackground ? (
          <div className="flex relative flex-col items-start bg-white">
            <img src={logo} alt={logoAlt} className={logoClass} />
          </div>
        ) : (
          <img src={logo} alt={logoAlt} className={logoClass} />
        )}
      </div>

      <div className="flex relative flex-col items-start max-w-[668px]">
        <div className="flex relative flex-col items-start">
          {details.map((detail, index) => (
            <div key={index} className="flex relative flex-col items-start self-stretch pb-6">
              <div className="relative text-base font-bold leading-5 text-white max-sm:text-sm max-sm:leading-4">
                <div>{detail.label}</div>
                <div className="font-bold">{detail.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}

export default BankInfo
