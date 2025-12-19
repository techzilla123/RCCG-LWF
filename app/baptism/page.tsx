"use client";

import React from "react";
import ChurchHeaderb from "@/components/Header/ChurchHeader";

export default function BaptismPage() {
  return (
    <div className="min-h-screen bg-white w-full overflow-hidden">
      {/* HEADER */}
      <ChurchHeaderb />

      {/* HERO / BANNER */}
      <section className="relative w-full h-[70vh] flex items-center justify-center">
        <img
          src="https://th.bing.com/th/id/R.95a1d270a04fa2de238aa541543fb65c?rik=p34BkWFC1NFAkA&riu=http%3a%2f%2fimages.fineartamerica.com%2fimages-medium-large-5%2fabstract-art-bold-colorful-modern-art-original-painting-color-blast-by-madart-megan-duncanson.jpg&ehk=0wpwv8cZ1PQH81XDFSXckwwjEETAV%2fOZzDlAPXatbZ0%3d&risl=&pid=ImgRaw&r=0"
          alt="Baptism"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-4xl text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Baptism
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200">
            A sacred ordinance symbolizing your new life in Christ, obedience, and public declaration of faith.
          </p>
        </div>
      </section>

      {/* INFO SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              About Baptism
            </h2>
            <p className="mt-6 text-gray-700 leading-relaxed">
              Baptism is an important step of faith where believers publicly
              identify with Christ, symbolizing the washing away of sin and
              the start of a new life.
            </p>

            <p className="mt-4 text-gray-700 leading-relaxed">
              Through baptism, you declare your commitment to follow Jesus, join
              the body of Christ, and grow spiritually in the church community.
            </p>

            {/* WHAT YOU WILL EXPERIENCE */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-gray-900">
                What You Will Experience
              </h3>

              <ul className="mt-4 space-y-3 text-gray-700 list-disc list-inside">
                <li>Public declaration of faith in Jesus Christ</li>
                <li>Spiritual cleansing and renewal</li>
                <li>Belonging to the church family</li>
                <li>Guidance for living a Christ-centered life</li>
                <li>Celebration with the community</li>
              </ul>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="bg-sky-50 rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900">
              Next Baptism Service
            </h3>

            <div className="mt-6 space-y-4">
              <InfoRow label="Date" value="Sunday, 10th March 2025" />
              <InfoRow label="Time" value="10:00 AM – 12:00 PM" />
              <InfoRow label="Venue" value="Church Auditorium / Baptism Pool" />
              <InfoRow label="Preparation Class" value="Saturday, 9th March 2025" />
            </div>

            {/* WHO SHOULD ATTEND */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-900">
                Who Should Attend?
              </h4>
              <p className="mt-3 text-gray-700">
                Anyone who has accepted Jesus Christ as Lord and Savior,
                completed a believers’ class or orientation, and desires to
                publicly declare their faith.
              </p>
            </div>

            {/* CTA */}
            <button
              className="mt-8 w-full py-4 rounded-xl bg-sky-600 text-white
              font-semibold text-lg hover:bg-sky-700 transition-all duration-300"
            >
              Register for Baptism
            </button>
          </div>
        </div>
      </section>

      {/* EXTRA SECTION */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Why Be Baptized?
          </h2>

          <p className="mt-6 text-gray-700 leading-relaxed">
            Baptism marks a transformative step in your spiritual journey. It
            strengthens your faith, integrates you into the body of Christ, and
            celebrates your new identity in Him.
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <Feature title="Public Declaration" text="Confess your faith boldly." />
            <Feature title="Spiritual Renewal" text="Experience cleansing and new beginnings." />
            <Feature title="Church Integration" text="Become an active part of our faith family." />
          </div>
        </div>
      </section>
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
