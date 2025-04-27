"use client";
import * as React from "react";
import { ToggleSwitch } from "./ToggleSwitch";
import { Button } from "./Button";

export const CookiePreferences: React.FC = () => {
  const [marketingEnabled, setMarketingEnabled] = React.useState(false);
  const [personalizationEnabled, setPersonalizationEnabled] =
    React.useState(false);

  return (
    <section className="flex flex-col justify-center mt-6 w-full max-md:max-w-full">
      <header className="flex flex-col justify-center pb-4 w-full leading-6 border-b border-solid border-b-[color:var(--colour-stroke-default,#D5D5D5)] min-w-[420px] max-md:max-w-full">
      <h3 className="text-xl font-bold " style={{color: "#000000"}}>
          Cookies preferences
        </h3>
        <p className="mt-1 text-base tracking-normal text-neutral-500 max-md:max-w-full">
          We use cookies to optimize the site performance. Some are essential
          others are optional.{" "}
          <a href="#" className="underline text-[#007AFF]">
            Learn more
          </a>
        </p>
      </header>

      <div className="flex overflow-hidden flex-wrap items-center py-2 w-full leading-6 bg-white max-md:max-w-full">
        <div className="flex overflow-hidden flex-1 shrink gap-2 items-center self-stretch py-2 my-auto basis-4 min-w-[200px] max-md:max-w-full">
          <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto w-full basis-0 min-w-60 max-md:max-w-full">
            <h3 className="text-base font-medium tracking-normal text-black max-md:max-w-full">
              Strictly neccessary
            </h3>
            <p className="mt-1 text-sm tracking-normal text-neutral-500 max-md:max-w-full">
              These cookies are necessary for the website to work smoothly and
              can&apos;t be disabled
            </p>
          </div>
        </div>
        <div className="flex overflow-hidden gap-2 justify-center self-stretch p-2 my-auto h-14 text-base font-medium tracking-normal text-center min-h-14 min-w-[120px] text-neutral-500 w-[124px]">
          <span className="flex-1 shrink w-full basis-0">Always on</span>
        </div>
      </div>

      <div className="flex overflow-hidden flex-wrap items-center py-2 w-full bg-white max-md:max-w-full">
        <div className="flex overflow-hidden flex-1 shrink gap-2 items-center self-stretch py-2 my-auto leading-6 basis-4 min-w-[200px] max-md:max-w-full">
          <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto w-full basis-0 min-w-60 max-md:max-w-full">
            <h3 className="text-base font-medium tracking-normal text-black max-md:max-w-full">
              Marketing & analytics
            </h3>
            <p className="mt-1 text-sm tracking-normal text-neutral-500 max-md:max-w-full">
              These cookies are used to collect site analytics and marketing
              purpose
            </p>
          </div>
        </div>
        <ToggleSwitch
          enabled={marketingEnabled}
          onChangeAction={setMarketingEnabled}
        />
      </div>

      <div className="flex overflow-hidden flex-wrap items-center py-2 w-full bg-white max-md:max-w-full">
        <div className="flex overflow-hidden flex-1 shrink gap-2 items-center self-stretch py-2 my-auto leading-6 basis-4 min-w-[200px] max-md:max-w-full">
          <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto w-full basis-0 min-w-60 max-md:max-w-full">
            <h3 className="text-base font-medium tracking-normal text-black max-md:max-w-full">
              Personalization
            </h3>
            <p className="mt-1 text-sm tracking-normal text-neutral-500 max-md:max-w-full">
              These cookies are used to improve your personalized web experience
            </p>
          </div>
        </div>
        <ToggleSwitch
          enabled={personalizationEnabled}
          onChangeAction={setPersonalizationEnabled}
        />
      </div>

      <div className="flex flex-wrap gap-2 items-start pt-4 w-full text-base font-medium tracking-normal leading-6 text-center max-md:max-w-full">
        <Button variant="primary">Save changes</Button>
        <Button variant="secondary">Enable all</Button>
      </div>
    </section>
  );
};
