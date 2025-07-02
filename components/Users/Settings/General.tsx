"use client";
import * as React from "react";
import { GeneralSettings } from "./General/GeneralSettings";
import { CookiePreferences } from "./General/CookiePreferences";

export const General: React.FC = () => {
  return (
     <div className="bg-white w-full min-h-screen py-12">
           <div className="max-w-3xl bg-white mx-auto px-4">
      <GeneralSettings />
      <CookiePreferences />
</div>
</div>
  );
};

export default General;
