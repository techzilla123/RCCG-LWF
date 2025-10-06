import React from 'react';

interface ContentPanelProps {
  imageSrc: string;
  title: string;
  subtitle?: string;
  description: string;
  buttonText: string;
  buttonColor: string;
  iconSrc: string;
  showSchedule?: boolean;
}

export const ContentPanel: React.FC<ContentPanelProps> = ({
  imageSrc,
  title,
  subtitle,
  description,
  buttonText,
  buttonColor,
  iconSrc,
  showSchedule = false
}) => {
  return (
    <article className="flex flex-wrap justify-center items-start self-center mt-16 max-w-full w-[1376px] max-md:mt-10">
      <div className="px-4 max-w-[675px] min-h-[526px] min-w-60 w-[487px] max-md:max-w-full">
        <img
          src={imageSrc}
          alt={title}
          className="object-contain w-full aspect-[1.24] max-md:max-w-full"
        />
      </div>
      <div className="flex flex-col justify-center items-start max-w-[945px] min-h-[585px] min-w-60 w-[544px] max-md:max-w-full">
        <div className="flex-1 px-4 pb-60 max-w-[810px] w-[445px] max-md:pb-24">
          <h1 className="z-10 text-5xl font-black leading-none text-slate-800 max-md:text-4xl">
            <div className="font-black leading-[68.4px] max-md:text-4xl">
              {title}
            </div>
          </h1>

          {subtitle && (
            <h3 className="mt-3.5 text-2xl leading-tight uppercase text-slate-800">
              <div className="leading-8">
                {subtitle}
              </div>
            </h3>
          )}

          <div className="gap-8 mt-8">
            {showSchedule && (
              <div className="flex flex-col justify-center p-0.5 max-w-full text-sm leading-relaxed min-w-[243px] text-stone-400 w-[243px]">
                <div className="gap-0.5 w-full">
                  <div className="flex flex-col justify-center py-1 pr-1 pl-4 max-w-full font-bold w-[135px]">
                    <div className="text-sm font-bold leading-5">
                      WHEN WE MEET
                    </div>
                  </div>
                  <div className="flex gap-0.5 justify-center items-start w-full">
                    <div className="flex flex-col justify-center py-1 pr-1 pl-4 whitespace-nowrap w-[135px]">
                      <div className="text-sm leading-5">
                        Sundays
                      </div>
                    </div>
                    <div className="flex flex-col justify-center py-1 pr-1 pl-4 w-[103px]">
                      <div className="text-sm leading-5">
                        9 & 10:30AM
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <p className={`${showSchedule ? 'mt-8' : ''} text-lg leading-7 text-zinc-900 max-md:max-w-full`}>
              {description}
            </p>
          </div>

          <div className="flex flex-col justify-center items-start py-2 mb-0 w-full max-md:mb-2.5">
            <button className={`flex relative gap-7 justify-center items-start pt-2.5 pr-14 pb-3 pl-7 ${buttonColor} rounded max-md:px-5`}>
              <div className="flex absolute top-3 right-5 z-0 flex-col items-center bottom-[13px] w-[11px]">
                <div className="flex items-start w-[11px]">
                  <img
                    src={iconSrc}
                    alt=""
                    className="object-contain aspect-[0.65] w-[11px]"
                  />
                </div>
              </div>
              <span className="z-0 text-lg font-bold leading-5 text-center text-rose-100">
                {buttonText}
              </span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
