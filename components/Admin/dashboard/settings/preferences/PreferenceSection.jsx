import React from 'react';

function PreferenceSection({ title, children }) {
  return (
    <div className="flex flex-col mt-11 w-full max-md:mt-10 max-md:max-w-full">
      <h2 className="w-full text-sm font-semibold text-neutral-500 max-md:max-w-full">
        {title}
      </h2>
      {children}
    </div>
  );
}

export default PreferenceSection;