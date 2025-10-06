import * as React from "react";
import { EventsHeader } from "./EventsHeader";
import { EventsGrid } from "./EventsGrid";
import { SeeMoreButton } from "./SeeMoreButton";

export const EventsSection: React.FC = () => {
  return (
<section className="flex flex-col justify-center items-center pt-11 pb-16 bg-stone-300/60">

      <EventsHeader />
      <EventsGrid />
      <SeeMoreButton />
    </section>
  );
};

export default EventsSection;
