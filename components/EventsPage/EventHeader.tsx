import * as React from "react";

function EventHeader() {
  return (
    <header className="flex z-0 flex-wrap gap-10 justify-between items-start max-w-full text-stone-950 w-[1170px]">
      <h1 className="text-5xl tracking-wider leading-none text-center text-stone-950 max-md:text-4xl">
        More event
      </h1>
      <p className="text-base leading-7 text-stone-950 w-[650px] max-md:max-w-full">
        <span style={{color: 'rgba(122,56,252,1)'}}>
          Church events at Living Word
        </span>{" "}
        bring people together for uplifting worship, inspiring messages,
        interactive workshops, and meaningful fellowship that nurture faith
        and strengthen community.
      </p>
    </header>
  );
}

export default EventHeader;
