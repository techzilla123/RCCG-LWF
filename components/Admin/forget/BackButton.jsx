import React from 'react';
import Link from 'next/link'; // Import Link from next/link

function BackButton() {
  return (
    <Link href="/auth/login">
      <button className="flex overflow-hidden gap-2 justify-start items-center px-0 py-2 h-8 border border-solid bg-black bg-opacity-0 border-black border-opacity-0 min-h-[32px] rounded-[1000px]">
        <div className="flex gap-2.5 items-center self-stretch my-auto w-4">
          <img loading="lazy" src="/arrow-left.png" alt="Back" />
        </div>
        <span className="self-stretch my-auto text-sm font-medium text-neutral-500">
          Back
        </span>
      </button>
    </Link>
  );
}

export default BackButton;
