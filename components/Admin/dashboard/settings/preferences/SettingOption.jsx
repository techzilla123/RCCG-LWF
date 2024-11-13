import React from 'react';

function SettingOption({ title, description, descriptionClass = "text-neutral-500", action }) {
  return (
    <div className="flex flex-wrap items-start mt-4 w-full max-md:max-w-full">
      <div className="flex flex-col flex-1 shrink justify-center basis-0 min-w-[240px] max-md:max-w-full">
        <h3 className="gap-4 self-stretch w-full text-base text-black max-md:max-w-full">
          {title}
        </h3>
        <p className={`mt-2 text-xs ${descriptionClass} max-md:max-w-full`}>
          {description}
        </p>
      </div>
      <div className="flex flex-col items-end min-w-[160px]">
        {action}
      </div>
    </div>
  );
}

export default SettingOption;