import React from 'react';

export const RootedSection: React.FC = () => {
  return (
    <section className="flex relative flex-col gap-6 items-start pt-10 pr-11 pb-3 pl-0 border-r-2 border-solid border-r-stone-800 flex-[1_0_0] min-h-px max-md:px-0 max-md:pt-0 max-md:pb-10 max-md:border-b-2 max-md:border-solid max-md:border-b-stone-800 max-md:border-r-[none]">
      <div className="flex relative flex-col items-start self-stretch">
        <a href="#" className="flex relative items-start pb-1">
          <div className="flex relative items-start rounded-sm max-w-[498px]">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/5f4a693ca653c660820069c08621fc0c80d92633?width=996"
              alt="Rooted 2025 program"
              className="object-cover relative h-[332px] max-w-[498px] w-[498px] max-md:w-full max-md:max-w-full max-md:h-auto"
            />
          </div>
        </a>
      </div>
      <article className="flex relative flex-col gap-0 items-start self-stretch">
        <header className="flex relative flex-col items-start self-stretch pb-2.5">
          <h3 className="relative self-stretch text-base font-bold leading-4 uppercase text-zinc-800 max-sm:text-sm">
            ROOTED 2025
          </h3>
        </header>
        <div className="flex relative flex-col items-start self-stretch pb-4">
          <p className="relative self-stretch text-base font-light leading-6 text-zinc-800 max-sm:text-sm max-sm:leading-5">
            Rooted is a 10-week discipleship experience that helps you grow
            closer to God, build meaningful relationships and discover the
            purpose He has for your life. Rooted guides you to practice the
            seven rhythms of following Jesus to transform your faith from
            something you know into something you live out every day.
          </p>
        </div>
        <div className="flex relative flex-col items-end self-stretch">
          <button className="relative text-base font-bold leading-6 text-right cursor-pointer text-slate-700 max-sm:text-sm hover:text-slate-600 transition-colors">
            LEARN MORE→
          </button>
        </div>
      </article>
    </section>
  );
};
