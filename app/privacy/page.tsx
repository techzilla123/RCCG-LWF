"use client";

import Offer from "@/components/Offer"
import TopNavBar from "@/components/TopNavBar"
import Footer from "@/components/Footer"
import BotpressChat from "@/components/BotpressChat";

export default function PrivacyPolicy() {
  return (
    <>
      <Offer />
      <TopNavBar />
      <section className="flex overflow-hidden flex-col justify-center self-stretch px-32 py-16 bg-stone-50 max-md:px-5">
        <header className="flex flex-col justify-center items-center w-full text-black min-w-[200px] max-md:max-w-full">
          <h1 className="text-4xl">Privacy Policy</h1>
          <p className="mt-2 text-base tracking-normal leading-6">
            How we collect, use, and protect your information
          </p>
        </header>
        <div className="flex flex-col justify-center self-center mt-6 max-w-full w-[800px]">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="prose prose-gray max-w-none">
              <p className="text-base leading-7 mb-6">
                As described in our Privacy Policy, we collect personal information from your interactions with us and our website, including through cookies and similar technologies. We may also share this personal information with third parties, including advertising partners. We do this to show you ads on other websites that are more relevant to your interests and for other reasons outlined in our privacy policy.
              </p>
              
              <p className="text-base leading-7 mb-6">
                Sharing of personal information for targeted advertising based on your interaction on different websites may be considered "sales", "sharing", or "targeted advertising" under certain U.S. state privacy laws. Depending on where you live, you may have the right to opt out of these activities.
              </p>
              
              <p className="text-base leading-7 mb-6">
                If you would like to exercise this opt-out right, please navigate to the setting tab under your profile, then Notifications tab then unchecks as applicable.
              </p>
              
              <p className="text-base leading-7">
                If you visit our website with the opt-out preference, depending on where you are, we will treat this as a request to opt-out of activity that may be considered a "sale" or "sharing" of personal information or other uses that may be considered targeted advertising for the device and browser you used to visit our website.
              </p>
            </div>
          </div>
        </div>
      </section>
      <BotpressChat />
      <Footer />
    </>
  );
}
