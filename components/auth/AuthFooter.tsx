import React from "react";
import { roboto } from "@/lib/fontData";
const AuthFooter = () => {
  return (
    <>
      <footer className="h-[61px] bg-[#001C09]  ">
        <div className="flex items-center justify-between px-[9rem] ">
          <h3 className="text-[#08AA3B] mt-[1rem]">support@yctmb.com</h3>
          <h3 className="text-[#717171] mt-[1rem]">
            &copy; 2024 yctmb. All rights reserved.
          </h3>
        </div>
      </footer>
    </>
  );
};

export default AuthFooter;
