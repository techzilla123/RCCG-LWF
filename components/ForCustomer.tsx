import React from "react";


const metricData = [
  { number: "400+", text: "Projects completed" },
  { number: "600%", text: "Return on Investment" },
  { number: "100%", text: "Satisfaction rate" },
  { number: "100%", text: "Satisfaction rate" }
];

function ForCustomer() {
  return (
    <section data-layername="metrics" className="flex overflow-hidden z-0 flex-wrap gap-10 justify-center px-32 py-20 w-full bg-teal-50 max-md:px-5 max-md:max-w-full">
      <div className="flex flex-1 shrink basis-0 bg-neutral-100 h-[487px] min-w-[240px] rounded-[40px] w-[488px]" aria-hidden="true" />
      <div data-layername="content" className="flex flex-col flex-1 shrink basis-0 min-w-[240px] max-md:max-w-full">
        <div data-layername="headingAndSupportingText" className="flex flex-col w-full max-md:max-w-full">
          <div data-layername="headingAndSubheading" className="flex flex-col w-full max-md:max-w-full">
            <p data-layername="subheading" className="text-sm font-semibold text-neutral-500 max-md:max-w-full">
              We've helped hundreds of companies
            </p>
            <h2 data-layername="heading" className="mt-3 text-5xl font-bold text-black max-md:max-w-full max-md:text-4xl">
              We're only just getting started on our journey
            </h2>
          </div>
        </div>
        <div data-layername="row" className="flex flex-wrap gap-8 justify-between items-start mt-10 w-full max-md:max-w-full">
          {metricData.map((metric, index) => (
            <div key={index} data-layername="metricItem" className="flex flex-col">
              <div data-layername="numberAndText" className="flex flex-col">
                <div data-layername="number" className="text-6xl font-semibold tracking-tighter leading-tight text-customer_green max-md:text-4xl">
                  {metric.number}
                </div>
                <div data-layername="text" className="mt-3 text-lg font-medium leading-loose text-black">
                  {metric.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ForCustomer;

