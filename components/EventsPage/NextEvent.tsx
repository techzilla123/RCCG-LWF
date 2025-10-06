"use client";
import * as React from "react";
import EventHeader from "./EventHeader";
import EventCards from "./EventCards";
import BackgroundShape from "./BackgroundShape";

function NextEvent() {
  return (
    <section className="relative flex flex-col items-center w-full px-0 py-32 max-md:pt-24 overflow-hidden">
      <EventHeader />
      <EventCards />
      <BackgroundShape />
    </section>
  );
}

export default NextEvent;
