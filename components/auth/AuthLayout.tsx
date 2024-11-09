"use client";
import React, { FC } from "react";
import { AuthData } from "@/interface";
import { FcGoogle } from "react-icons/fc";
import { inter, roboto } from "@/lib/fontData";


const AuthLayout: FC<AuthData> = ({ formName, formDes, children }) => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-[#F5F5F5] p-[1rem]">
      <div className="flex flex-col items-start justify-start bg-white lg:w-1/3  p-4 rounded-[16px] shadow-lg py-[3.5rem]">
        <div className="flex flex-col gap-4 w-full px-[1rem] ">
          <h1
            className={`${inter.className} text-[#005E1E] font-bold text-[600] text-[36px] leading-[43.57px] title-text`}
          >
            {formName}
          </h1>

          <h4
            className={`${roboto.className} text-[16px] font-[400] leading-[18.75px]`}
          >
            {formDes}
          </h4>
          <button className="flex items-center justify-center gap-2 border-2 border-[#D6D6D6] rounded-[2rem] p-2 px-6">
            <span className="text-[30px]">
              <FcGoogle />
            </span>

            <h3
              className={`text-[14px] font-[500] leading-[17px] capitalize text-[#000000] ${inter.className}`}
            >
              continue with google
            </h3>
          </button>

          <div className="flex w-full items-center justify-center gap-3">
            <div className="h-[1px] w-full bg-[#D6D6D6] rounded-xl"></div>
            <h2
              className={`${inter.className} uppercase text-[14px] leading-[20px]  text-[#717171]`}
            >
              or
            </h2>
            <div className="h-[1px] w-full bg-[#D6D6D6] rounded-xl"></div>
          </div>
        </div>

        <div className="w-full px-[1rem] mt-[1.5rem]">{children}</div>
      
      </div>
    </main>
  );
};

export default AuthLayout;
