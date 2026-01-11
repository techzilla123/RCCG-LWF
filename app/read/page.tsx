"use client";

import React from "react";
import ChurchHeaderb from "@/components/Header/ChurchHeader";

export default function ReadingPlanPage() {
  return (
    <div className="min-h-screen bg-white w-full overflow-hidden">
      {/* HEADER */}
      <ChurchHeaderb />

      {/* HERO SECTION */}
      <section className="relative w-full h-[70vh] flex items-center justify-center">
        <img
src="https://wallpapers.com/images/high/awesome-depiction-of-holy-bible-uj4sfr9sp014rba4.webp"
alt="Bible Reading Plan"
loading="eager"
decoding="async"
className="absolute inset-0 w-full h-full object-cover object-center"
/>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Reading Plan
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200">
            Reading the Bible in a Year
          </p>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* LEFT TEXT */}
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>✔ Read the entire Bible or just the New Testament in one year!</p>
            <p>✔ Chronological reading plan helps the Bible make sense!</p>
            <p>
              This special Bible reading system allows you to read the entire Bible
              (or just the New Testament) in one year while only reading five times
              a week. Five readings a week gives room to catch up or take a day off
              to focus on other Bible reading or spiritual disciplines.
            </p>
            <p>
              The Old Testament readings are placed as chronologically as possible,
              helping Scripture flow naturally and clearly throughout the year.
            </p>
            <p className="italic">
              “Thy word is a lamp to my feet, and a light to my path” (Psalm 119:105)
            </p>
          </div>

          {/* DOWNLOAD CARD */}
          <div className="bg-sky-50 rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900">
              Download Reading Plan
            </h3>
            <p className="mt-4 text-gray-700">
              View or download the complete Bible reading plan exactly as provided
              by the church.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href="/read2.jpeg"
                download
                className="block w-full text-center py-4 rounded-xl bg-sky-600 text-white font-semibold hover:bg-sky-700 transition"
              >
                Download Weeks 1–18
              </a>
              <a
                href="/read1.jpeg"
                download
                className="block w-full text-center py-4 rounded-xl bg-sky-600 text-white font-semibold hover:bg-sky-700 transition"
              >
                Download Weeks 19–52
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE DISPLAY SECTION */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Complete Reading Plan
          </h2>

          <div className="mt-12 space-y-12">
            <div className="bg-white rounded-2xl shadow-md p-4">
              <img
                src="/read2.jpeg"
                alt="Reading Plan Weeks 1 to 18"
                className="w-full h-auto rounded-xl"
              />
            </div>

            <div className="bg-white rounded-2xl shadow-md p-4">
              <img
                src="/read1.jpeg"
                alt="Reading Plan Weeks 19 to 52"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER VERSE */}
      <footer className="py-12 text-center italic text-gray-600">
        Study to show yourself approved… 2 Timothy 2:15
      </footer>
    </div>
  );
}
