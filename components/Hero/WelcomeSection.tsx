import type * as React from "react"
import { ReadStoryButton } from "./ReadStoryButton"

export const WelcomeSection: React.FC = () => {
  return (
    <section className="flex flex-col justify-center py-7 mt-7 w-full">
      <div className="flex flex-col gap-1 w-full">
        <div className="pb-2.5 w-full text-3xl md:text-4xl font-bold leading-tight md:leading-none text-center uppercase text-zinc-800">
          <h2>YOU&apos;RE WELCOME HERE!</h2>
        </div>
        <div className="self-center pb-3.5 mt-1 max-w-full w-[200px]">
          <div className="flex shrink-0 border-t-2 border-solid border-t-slate-700 h-[3px]" />
        </div>
        <div className="flex flex-col items-center self-center mt-1 max-w-full text-base font-light leading-7 text-center text-zinc-800 w-full md:w-[880px] px-4 md:px-0">
          <p className="text-pretty">
            RCCG Living Word Forney is a family of believers united in Christ, walking in love, peace, and faith as we
            grow together in Him. It is a place of hope, strength, and encouragement where lives are transformed and
            God&apos;s Word is our foundation. No matter who you are or where you come from, you are welcome to find refuge,
            community, and purpose here. At Living Word Forney, we press toward Christlikeness and live in the victory
            of faith. Welcome Home!
          </p>
        </div>
        <ReadStoryButton />
      </div>
    </section>
  )
}
