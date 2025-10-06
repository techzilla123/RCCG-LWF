"use client";
import * as React from "react";
import { MediaHeader } from "./MediaHeader";
import { MediaGrid } from "./MediaGrid";

export function MediaSection() {
  return (
    <section className="flex overflow-hidden relative flex-col px-64 py-20 max-w-full min-h-[464px] max-md:px-5">
      <img
        src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/32f591023aa793571acc3c778f9cf858fb678f7d?placeholderIfAbsent=true"
        alt=""
        className="object-cover absolute inset-0 size-full"
      />
      <MediaHeader />
      <MediaGrid />
    </section>
  );
}

export default MediaSection;
