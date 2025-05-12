"use client";
import * as React from "react";
import { ToggleSwitch } from "./ToggleSwitch";
import { Button } from "./Button";

export const CookiePreferences: React.FC = () => {
  const [marketingEnabled, setMarketingEnabled] = React.useState(false);
  const [personalizationEnabled, setPersonalizationEnabled] = React.useState(false);

  return (
    <section className="flex flex-col justify-center mt-6 w-full px-4 sm:px-6">
      <header className="flex flex-col justify-center pb-4 w-full border-b border-gray-300">
        <h3 className="text-xl font-bold text-black">Cookies preferences</h3>
        <p className="mt-1 text-base text-neutral-500 break-words">
          We use cookies to optimize the site performance. Some are essential, others are optional.{" "}
          <a href="#" className="underline text-[#007AFF]">
            Learn more
          </a>
        </p>
      </header>

      {/* Strictly Necessary */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 w-full border-b border-gray-200">
        <div className="flex-1">
          <h3 className="text-base font-medium text-black">Strictly necessary</h3>
          <p className="mt-1 text-sm text-neutral-500">
            These cookies are necessary for the website to work smoothly and can&apos;t be disabled.
          </p>
        </div>
        <div className="mt-2 sm:mt-0 text-sm text-neutral-500 font-medium">Always on</div>
      </div>

      {/* Marketing & Analytics */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 w-full border-b border-gray-200">
        <div className="flex-1">
          <h3 className="text-base font-medium text-black">Marketing & analytics</h3>
          <p className="mt-1 text-sm text-neutral-500">
            These cookies are used to collect site analytics and for marketing purposes.
          </p>
        </div>
        <div className="mt-2 sm:mt-0">
          <ToggleSwitch
            enabled={marketingEnabled}
            onChangeAction={setMarketingEnabled}
          />
        </div>
      </div>

      {/* Personalization */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 w-full">
        <div className="flex-1">
          <h3 className="text-base font-medium text-black">Personalization</h3>
          <p className="mt-1 text-sm text-neutral-500">
            These cookies are used to improve your personalized web experience.
          </p>
        </div>
        <div className="mt-2 sm:mt-0">
          <ToggleSwitch
            enabled={personalizationEnabled}
            onChangeAction={setPersonalizationEnabled}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full">
        <Button variant="primary" className="w-full sm:w-auto">Save changes</Button>
        <Button variant="secondary" className="w-full sm:w-auto">Enable all</Button>
      </div>
    </section>
  );
};
