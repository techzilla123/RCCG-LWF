import * as React from "react";

export function AboutContent() {
  return (
    <article className="flex flex-col flex-1 shrink justify-center self-stretch p-10 my-auto bg-purple-100 basis-0 max-w-[560px] min-w-[200px] max-md:px-5 max-md:max-w-full">
      <header className="self-start">
        <p className="text-base tracking-normal leading-6 text-neutral-500">
          About us
        </p>
        <h2 className="mt-1 text-4xl text-black">Who are we?</h2>
      </header>
      <p className="mt-4 text-sm tracking-normal leading-6 text-black max-md:max-w-full">
        Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod
        tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam,
        nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
      </p>
    </article>
  );
}
