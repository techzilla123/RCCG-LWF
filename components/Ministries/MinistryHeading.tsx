import * as React from "react";

export function MinistryHeading() {
  return (
    <header className="flex relative flex-col justify-center py-7 max-w-full text-4xl font-light leading-snug text-center uppercase text-zinc-800 w-[1080px]">
      <h1 className="pb-2.5 w-full max-md:max-w-full">
        <div className="max-md:max-w-full">
          <span style={{color: "rgba(50,50,50,1)"}}>THE </span>
          <span style={{fontWeight: 700, color: "rgba(50,50,50,1)"}}>
            RCCG lwf Ministry
          </span>
        </div>
      </h1>
    </header>
  );
}
