import * as React from "react";
import { CallToActionButton } from "./CallToActionButton";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: "300", // Light
  subsets: ["latin"],
});

export function MinistryContent() {
  return (
    <article className="flex flex-col flex-1 shrink pt-5 basis-0 min-h-px min-w-60 max-md:max-w-full">
      <div className="flex flex-col items-center self-center max-w-full w-[250px]">
        <img
          src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/c6527fa8417a5c62aaf08fb374dd2e0bf7b0a7fc?placeholderIfAbsent=true"
          alt="Ministry logo"
          className="object-contain w-full aspect-[1.97]"
        />
      </div>

      <div
  className={`flex flex-col items-center mx-auto text-center text-zinc-800 ${montserrat.className} max-w-2xl`}
>
        <p
          className="max-md:max-w-full"
          style={{ fontSize: "15px", lineHeight: "27px", fontWeight: 300 }}
        >
          Our kids ministry exists to help kids come to know Jesus as
        
          their Lord and Savior. We believe that if the church and family
        
          work together, a child has the best chance of growing to
          
          know, love and follow Jesus. This is a place where kids birth –
       
          grade 5 can explore God&apos;s Word and experience His love each
        
          week.
        </p>
      </div>

      <div className="flex flex-col items-center mt-10 w-full text-base font-medium leading-7 text-center text-white uppercase max-md:max-w-full">
        <CallToActionButton>LEARN MORE</CallToActionButton>
      </div>
    </article>
  );
}
