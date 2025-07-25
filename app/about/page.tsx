"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";

export default function AboutUsPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Back Button */}
      <div className="px-4 pt-6 sm:px-8 md:px-12">
        <button
          onClick={() => router.push("/")}
          className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition duration-300"
        >
          ← Back to Home
        </button>
      </div>

      <main className="flex-1 py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          {/* About Section */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="flex justify-center md:justify-start">
              <Image
                src="/0O0A7266.JPG"
                width={600}
                height={400}
                alt="Party Place Storefront"
                className="rounded-lg object-cover w-full max-w-md md:max-w-none"
              />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
              <p className="text-gray-700 leading-relaxed">
                Party Place is a Party retail store stocking a wide range of Party supplies such as balloons, specialty napkins, Gifts, Decorations, Costumes, themed party supplies, party equipment rentals... and lots more.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Offering more than just party supplies, we provide Balloon Decorations, Party & Event Rentals with same-day doorstep delivery. Our friendly and amiable staff is always happy to help you find exactly what you need. Most importantly, you’ll discover exotic items at unbeatable prices — covering a wide variety of locations in the US.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Visit us today and you will be happy you did.
              </p>
            </div>
          </div>

          {/* Our Brand Section */}
          <div className="mt-16 md:mt-24 lg:mt-32 grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 order-2 md:order-1">
              <h2 className="text-3xl font-bold text-gray-900">Our brand communicates the following</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  <strong>We&apos;ve Got Everything You Need to Party:</strong> This emphasizes our complete selection of party essentials, ensuring customers find everything they need for any celebration.
                </li>
                <li>
                  <strong>Quality and Variety:</strong> We provide high-quality products and a diverse range of themes and styles.
                </li>
                <li>
                  <strong>Customer Satisfaction:</strong> Our staff is here to help you create memorable events with ease and confidence.
                </li>
                <li>
                  <strong>Convenience and Value:</strong> Enjoy competitive pricing and same-day delivery to make party planning stress-free.
                </li>
              </ul>
            </div>
            <div className="flex justify-center md:justify-end order-1 md:order-2">
              <Image
                src="/photo-collage.png.png"
                width={500}
                height={350}
                alt="People working"
                className="rounded-lg object-cover w-full max-w-md md:max-w-none"
              />
            </div>
          </div>

          {/* Mission Statement */}
          <div className="mt-16 md:mt-24 grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="flex justify-center">
              <Image
                src="/mission-statement-1024x683.jpg"
                width={500}
                height={350}
                alt="Mission Statement"
                className="rounded-lg object-cover w-full max-w-md md:max-w-none"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Company Mission Statement</h2>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Our mission at Party Place & Rentals is to be the heartbeat of celebrations, igniting joy and unforgettable memories through our curated selection of quality products and exceptional service.
              </p>
              <p className="mt-2 text-gray-700 leading-relaxed">
                We strive to inspire creativity, foster connections, and elevate every moment, ensuring that every party, big or small, is a cherished and memorable event for our customers.
              </p>
            </div>
          </div>

          {/* Company Vision */}
          <div className="mt-16 md:mt-24 grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Company’s Vision</h2>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Our vision at Party Place & Rentals is to become the premier destination for all things celebration, setting the standard for creativity, innovation, and exceptional customer experiences in the party supply industry.
              </p>
              <p className="mt-2 text-gray-700 leading-relaxed">
                We aspire to continuously delight our customers with an extensive selection of top-quality products, trend-setting designs, and personalized services, making every celebration an extraordinary and unforgettable event.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/BeFunky-collage (1).jpg"
                width={500}
                height={350}
                alt="Company Vision"
                className="rounded-lg object-cover w-full max-w-md md:max-w-none"
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-6 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Party Place and Rentals. All rights reserved.
      </footer>
    </div>
  );
}
