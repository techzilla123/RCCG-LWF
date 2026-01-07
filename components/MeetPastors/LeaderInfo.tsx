"use client"

import { useState } from "react"

export const LeaderInfo = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <section className="flex w-full max-w-[540px] flex-col gap-8 text-center lg:text-left">
      {/* Heading */}
      <header className="flex flex-col gap-5">
        <h1 className="text-4xl font-bold tracking-wider text-white md:text-5xl">
          Meet Our Leaders
        </h1>

        <p className="text-base leading-relaxed text-zinc-300">
          At Living Word Forney, we are blessed to be led by servants whose lives
          reflect deep faith, spiritual maturity, and decades of faithful
          ministry.
        </p>
      </header>

      {/* Core Description */}
      <div className="flex flex-col gap-5 text-sm leading-relaxed text-zinc-300">
        <p>
          For over{" "}
          <span className="font-semibold text-white">35 years</span>, they have
          walked together in ministry, serving with humility, obedience, and
          unwavering commitment to God’s purpose.
        </p>

        <p>
          Married since{" "}
          <span className="font-semibold text-white">1997</span>, their home
          stands as a testimony of God’s faithfulness.
        </p>

        {/* Expandable Content */}
        <div
          className={`grid transition-all duration-500 ease-in-out ${
            expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="mt-5 flex flex-col gap-5">
              <p>
                They are blessed with three children raised in the fear and
                knowledge of the Lord, reflecting a home founded on prayer,
                discipline, and love.
              </p>

              <p>
                Brother Harrison Kolade holds a Master’s degree in Nursing, while
                Sister Olubukola Harrison is a Licensed Vocational Nurse. Their
                professional excellence strengthens their servant leadership
                with compassion and wisdom.
              </p>

              <p>
                As spiritual parents of the Living Word Forney family, they lead
                with prayer, love, and a passion to see lives transformed by the
                Gospel.
              </p>
            </div>
          </div>
        </div>

        {/* Read More Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="group mt-2 inline-flex w-fit items-center gap-2 self-center lg:self-start text-sm font-semibold text-yellow-400 transition hover:text-yellow-300"
          aria-expanded={expanded}
        >
          {expanded ? "Read less" : "Read more"}
          <span
            className={`inline-block transition-transform duration-300 ${
              expanded ? "rotate-180" : "rotate-0"
            }`}
          >
            ↓
          </span>
        </button>
      </div>

      {/* Scripture */}
      <blockquote className="border-l-4 border-yellow-400 pl-4 text-sm italic text-zinc-400">
        “But my life is worth nothing to me unless I use it for finishing the
        work assigned me by the Lord Jesus—the work of telling others the Good
        News about the wonderful grace of God.”
        <span className="mt-2 block text-zinc-500">— Acts 20:24 (NLT)</span>
      </blockquote>

      {/* Signature */}
      <div className="pt-4">
        <p className="font-semibold text-white">
          Brother & Sister Harrison Kolade
        </p>
        <p className="text-sm text-yellow-400">
          Servant Leaders — Living Word Forney
        </p>
      </div>
    </section>
  )
}
