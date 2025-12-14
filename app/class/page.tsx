"use client";

import React from "react";
import ChurchHeaderb from "@/components/Header/ChurchHeader";
import Footer from '@/components/Footer/Footer';

export default function BelieversClassPage() {
  return (
    <div className="min-h-screen bg-white w-full overflow-hidden">
      {/* HEADER */}
      <ChurchHeaderb />

      {/* HERO / BANNER */}
      <section className="relative w-full h-[70vh] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1529070538774-1843cb3265df"
          alt="Believers Class"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-4xl text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Believers’ Class
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200">
            A foundational class designed to establish believers in Christ,
            doctrine, and the values of RCCG Living Word Family.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              About the Believers’ Class
            </h2>

            <p className="mt-6 text-gray-700 leading-relaxed">
              The Believers’ Class is designed to ground members in the core
              truths of the Christian faith. It is especially beneficial for
              new converts and members who desire clarity on salvation, faith,
              and Christian living.
            </p>

            <p className="mt-4 text-gray-700 leading-relaxed">
              Through systematic teaching and scriptural guidance, participants
              gain a strong spiritual foundation that enables growth, service,
              and maturity in Christ.
            </p>

            {/* LEARNING OUTCOMES */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-gray-900">
                Key Areas Covered
              </h3>

              <ul className="mt-4 space-y-3 text-gray-700 list-disc list-inside">
                <li>Salvation and assurance of faith</li>
                <li>The Holy Spirit and spiritual growth</li>
                <li>Prayer, Bible study, and Christian discipline</li>
                <li>RCCG beliefs, values, and mission</li>
                <li>Living a Christ-centered lifestyle</li>
              </ul>
            </div>
          </div>

          {/* RIGHT INFO CARD */}
          <div className="bg-sky-50 rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900">
              Class Information
            </h3>

            <div className="mt-6 space-y-4">
              <InfoRow label="Next Class Begins" value="Sunday, 3rd March 2025" />
              <InfoRow label="Time" value="8:30 AM – 10:00 AM" />
              <InfoRow label="Venue" value="Church Auditorium (Class Room 2)" />
              <InfoRow label="Duration" value="8 Weeks" />
            </div>

            {/* ATTENDANCE NOTE */}
            <div className="mt-8 rounded-xl bg-white p-4 border border-sky-200">
              <p className="text-gray-700 text-sm leading-relaxed">
                Attendance is highly encouraged for members seeking baptism,
                church membership confirmation, or a deeper understanding of
                the Christian faith.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY SECTION */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Why the Believers’ Class Matters
          </h2>

          <p className="mt-6 text-gray-700 leading-relaxed">
            Spiritual growth is intentional. This class provides clarity,
            direction, and confidence for every believer’s journey.
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <Feature
              title="Biblical Foundation"
              text="Understand the essentials of the Christian faith."
            />
            <Feature
              title="Spiritual Maturity"
              text="Grow in knowledge, faith, and Christian character."
            />
            <Feature
              title="Church Alignment"
              text="Understand RCCG values and the church’s mission."
            />
          </div>
        </div>
        
      </section>
      <Footer />
    </div>
  );
}

/* SMALL COMPONENTS */

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center border-b border-sky-200 pb-2">
    <span className="font-medium text-gray-700">{label}</span>
    <span className="font-semibold text-gray-900">{value}</span>
  </div>
);

const Feature = ({ title, text }: { title: string; text: string }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
    <p className="mt-2 text-gray-700">{text}</p>
  </div>
);
