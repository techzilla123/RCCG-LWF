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
  <strong>Your Ultimate Party Destination — Delivered Fast, Celebrated Big!</strong><br />
  From eye-catching balloon designs to themed décor, standout costumes, and party-perfect rentals — we have everything to turn your vision into reality.<br /><br />
  Planning last-minute? No worries! Enjoy same-day delivery and easy rentals that make organizing a breeze. Our warm, helpful team is always ready to guide you to the coolest finds — all at prices that’ll surprise you (in a good way).<br /><br />
  With wide coverage across the U.S., we bring the celebration straight to your door — fun, fast, and totally stress-free.<br /><br />
  <strong>Visit today — let’s make your next party unforgettable!</strong>
</p>

    </article>
  );
}
