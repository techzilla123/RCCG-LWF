"use client"

import Offer from "@/components/Offer"
import TopNavBar from "@/components/TopNavBar"
import Footer from "@/components/Footer"
import BotpressChat from "@/components/BotpressChat"

export default function TermsOfService() {
  return (
    <>
      <Offer />
      <TopNavBar />
      <section className="flex overflow-hidden flex-col justify-center self-stretch px-32 py-16 bg-stone-50 max-md:px-5">
        <header className="flex flex-col justify-center items-center w-full text-black min-w-[200px] max-md:max-w-full">
          <h1 className="text-4xl">Terms of Service</h1>
          <p className="mt-2 text-base tracking-normal leading-6">
            Terms and conditions for purchasing at Party Place & Rentals
          </p>
        </header>
        <div className="flex flex-col justify-center self-center mt-6 max-w-full w-[800px]">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="prose prose-gray max-w-none">
              <p className="text-base leading-7 mb-6">
                Welcome to Party Place & Rentals (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). By accessing and making a purchase on our online
                store, you (&quot;you&quot;, &quot;your&quot;) agree to the following Terms and Conditions. Please read them carefully
                before proceeding with any transactions.
              </p>

              <h3 className="text-xl font-semibold mb-4 text-black">1. General Information</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>By using this website and making a purchase, you agree to abide by these Terms and Conditions.</li>
                <li>
                  We reserve the right to modify or update these Terms at any time. Any changes will be posted on this
                  page, and the updated version will take effect immediately.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-black">2. Product Information</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>
                  All products listed on our online store are subject to availability. We reserve the right to
                  discontinue any products at any time.
                </li>
                <li>
                  We strive to ensure that product descriptions and prices are accurate, but we do not guarantee that
                  all information is free from errors. Prices and availability are subject to change without notice.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-black">3. Order Acceptance and Payment</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>
                  Once you place an order, we will send you an order confirmation email. This email is not an acceptance
                  of your order, but confirmation that we have received it.
                </li>
                <li>Orders are only considered accepted once payment has been processed and we confirm shipment.</li>
                <li>We accept payment via all the major Credit Cards, Shop Pay, PayPal, G Pay Apple Pay</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-black">4. Shipping and Delivery</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>We offer shipping to the US only. Shipping fees and delivery times are calculated at checkout.</li>
                <li>
                  While we make every effort to ensure timely delivery, we are not responsible for delays caused by
                  external factors such as weather, courier issues, or customs.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-black">5. Returns and Refunds</h3>
              <p className="text-base leading-7 mb-6">Refer to the Return Policy on the footer of the website</p>

              <h3 className="text-xl font-semibold mb-4 text-black">6. Pricing and Taxes</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>All prices listed on our website are in US Dollar and exclude taxes unless otherwise stated.</li>
                <li>Sales tax and shipping fees will be added to your total at checkout.</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-black">7. Privacy and Data Protection</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>
                  We respect your privacy. Any personal information collected during your purchase will be used in
                  accordance with our Privacy Policy, which can be found [here].
                </li>
                <li>
                  We do not share your personal information with third parties, except as necessary to fulfill your
                  order (e.g., shipping companies).
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-black">8. Intellectual Property</h3>
              <p className="text-base leading-7 mb-6">
                All content on this website, including text, images, logos, and trademarks, is the property of Party
                Place & Rentals and is protected by intellectual property laws. You may not use any content without
                permission.
              </p>

              <h3 className="text-xl font-semibold mb-4 text-black">9. Limitation of Liability</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>
                  We are not liable for any indirect, incidental, or consequential damage arising from your use of our
                  website or products.
                </li>
                <li>
                  Our total liability for any claim will not exceed the amount you paid for the product in question.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-black">10. Governing Law</h3>
              <p className="text-base leading-7 mb-6">
                These Terms and Conditions are governed by the laws of Dallas County, and any disputes will be resolved
                in the appropriate courts located in Dallas County.
              </p>

              <h3 className="text-xl font-semibold mb-4 text-black">11. Contact Information</h3>
              <p className="text-base leading-7 mb-4">
                If you have any questions or concerns regarding these Terms and Conditions, please contact us at:
              </p>
              <ul className="list-none mb-6 space-y-1">
                <li>
                  <strong>Email:</strong> support@partyplaceandrentals.com
                </li>
                <li>
                  <strong>Phone:</strong> 469-248-2060
                </li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <p className="text-sm font-medium text-blue-800">
                  By completing your purchase, you acknowledge that you have read, understood, and agreed to be bound by
                  these Terms and Conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BotpressChat />
      <Footer />
    </>
  )
}
