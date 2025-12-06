import type * as React from "react";
import { ReadStoryButton } from "./ReadStoryButton";
import DecoratedBackground from "@/components/Events/DecoratedBackground";

export const WelcomeSection: React.FC = () => {
  return (
    <section className="relative flex flex-col justify-center py-7 mt-7 w-full overflow-hidden">
      
      {/* 🔵 Colorful decorative dots */}
      <DecoratedBackground density={20} />

      <div className="relative z-10 flex flex-col gap-1 w-full">
        <div className="pb-2.5 w-full text-3xl md:text-4xl font-bold leading-tight md:leading-none text-center uppercase text-zinc-800">
          <h2>YOU&apos;RE WELCOME HERE!</h2>
        </div>
        <div className="self-center pb-3.5 mt-1 max-w-full w-[200px]">
          <div className="flex shrink-0 border-t-2 border-solid border-t-slate-700 h-[3px]" />
        </div>
        <div className="flex flex-col items-center self-center mt-1 max-w-full text-base font-light leading-7 text-center text-zinc-800 w-full md:w-[880px] px-4 md:px-0">
          <p className="text-pretty">
            The Redeemed Christian Church of God, Living Word Forney (LWF) is the assembly of believers standing strong and standing together in Christ Jesus, imitating God as dear children, keeping the unity of the spirit in the bond of peace. 

It is a place of hope for the hopeless, a place of refuge in times of trouble, a home for the needy and lonely, a shelter from the trouble storm, a school for the untaught. It is a place we are growing in the grace and knowledge of our Lord Jesus Christ and pressing towards the upward call of God unto Christlikeness. You are all welcome.

          </p>
        </div>
        <ReadStoryButton />
      </div>
    </section>
  );
};
