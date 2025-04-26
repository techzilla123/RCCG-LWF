import * as React from "react";
import { ActionButton } from "./ActionButton";

export const TitleSection: React.FC = () => {
  return (
    <section className="flex flex-col flex-1 shrink basis-0 min-h-60 min-w-[200px]">
      <p className="text-base tracking-normal leading-6 text-neutral-500">
        Editor&apos;s Picks
      </p>
      <h2 className="mt-2.5 text-3xl text-black">All for adults</h2>
      <ActionButton label="Find more" iconSrc="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/66d546e330544d515b682a58503bcbd12bbada55?placeholderIfAbsent=true" />
    </section>
  );
};
