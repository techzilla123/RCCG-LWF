// RootedSection.tsx
import React from 'react';
import { useRouter } from "next/navigation";

export const RootedSection: React.FC = () => {
  const router = useRouter();
  return (
    <section className="flex relative flex-col gap-6 items-start pt-10 pr-11 pb-3 pl-0 border-r-2 border-solid border-r-stone-800 flex-[1_0_0] min-h-px
      max-md:px-4 max-md:pt-6 max-md:pb-8 max-md:border-b-2 max-md:border-solid max-md:border-b-stone-800 max-md:border-r-0">
      
      <div className="flex relative flex-col items-start self-stretch w-full">
        <a href="/class" className="flex relative items-start pb-1 w-full">
          <div className="flex relative items-start rounded-sm w-full">
            <img
              src="/believe.jpg"
              alt="Rooted 2025 program"
              className="object-cover relative h-[332px] max-w-[498px] w-[498px] max-md:w-full max-md:h-auto max-md:max-w-full"
            />
          </div>
        </a>
      </div>

      <article className="flex relative flex-col gap-2 items-start self-stretch w-full">
        <header className="flex relative flex-col items-start self-stretch pb-2.5">
          <h3 className="relative self-stretch text-base font-bold leading-4 uppercase text-zinc-800 max-sm:text-sm">
            Believer&apos;s Class
          </h3>
        </header>

        <div className="flex relative flex-col items-start self-stretch pb-4">
          <p className="relative self-stretch text-base font-light leading-6 text-zinc-800 max-sm:text-sm max-sm:leading-5">
            The Believer’s Class is designed to strengthen your faith, deepen your understanding of God’s Word, and equip you for victorious Christian living. Through teaching, discussion, and fellowship, members grow in knowledge, wisdom, and spiritual maturity, building a firm foundation to walk confidently in Christ every day.
          </p>
        </div>

        <div className="flex relative flex-col items-start self-stretch">
          <button
            onClick={() => router.push("/class")}
            className="relative text-base font-bold leading-6 text-slate-700 hover:text-slate-600 transition-colors max-sm:text-sm"
          >
            LEARN MORE →
          </button>
        </div>
      </article>
    </section>
  );
};
