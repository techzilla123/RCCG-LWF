import React from 'react';

function SocialAuthButton() {
  return (
    <button className="flex overflow-hidden gap-3 justify-center items-center px-4 py-2.5 w-full font-medium text-black border border-solid bg-black bg-opacity-0 border-zinc-300 rounded-[100px]">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/7e1c4443d85922ca9733924216af09ccb23ed8de8d66bd12152d87d77961d89e?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a" alt="" className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square" />
      <span className="self-stretch my-auto">Continue with Google</span>
    </button>
  );
}

export default SocialAuthButton;
