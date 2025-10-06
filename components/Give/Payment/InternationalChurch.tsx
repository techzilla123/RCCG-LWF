import type React from "react"

const InternationalChurch: React.FC = () => {
  return (
    <section className="flex flex-col gap-6 p-8 bg-teal-100 rounded-3xl w-full h-auto max-md:p-6">
      <h2 className="text-2xl font-bold text-slate-900">International Church</h2>

      <div className="space-y-8">
        <div className="flex justify-between flex-wrap gap-4 items-center">
          <div>
            <h3 className="font-bold text-lg text-slate-900">A/C Name: Pistis Life Church</h3>
            <p className="text-xl font-semibold text-slate-900">
              Wells Fargo Bank<br />6188644220
            </p>
          </div>
          <div className="flex items-center justify-center p-4 bg-slate-900 rounded-full">
            <span className="text-3xl text-white">$</span>
          </div>
        </div>

        <div className="flex justify-between flex-wrap gap-4 items-center">
          <div>
            <h3 className="font-bold text-lg text-slate-900">A/C Name: The Elevation Church UK</h3>
            <p className="text-xl font-semibold text-slate-900">
              Metro Bank<br />43126083
            </p>
          </div>
          <div className="flex items-center justify-center p-4 bg-slate-900 rounded-full">
            <span className="text-3xl text-white">£</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InternationalChurch
