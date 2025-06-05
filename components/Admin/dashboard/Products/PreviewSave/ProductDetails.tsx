import * as React from "react";

export const ProductDetails = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [producer, setProducer] = React.useState("");
  const [url, setUrl] = React.useState("#");

  React.useEffect(() => {
    const storedProducer = localStorage.getItem("producer");
    const storedUrl = localStorage.getItem("url");

    if (storedProducer) setProducer(storedProducer);
    if (storedUrl) setUrl(storedUrl);
  }, []);

  return (
    <section className="overflow-hidden pt-4 mt-6 w-full border-t border-solid border-t-[color:var(--colour-stroke-default,#D5D5D5)]">
      <button
        className="flex flex-wrap justify-between items-center w-full"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <h2 className="text-base font-semibold text-black leading-[20px]">
          Product details
        </h2>
        <span className="flex gap-2.5 justify-center items-center self-stretch my-auto w-5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/568c68eeaaa026fc9e65ee05b5849ad0b09003cc?placeholderIfAbsent=true"
            alt={isExpanded ? "Collapse" : "Expand"}
            className="object-contain self-stretch my-auto w-5 aspect-square"
          />
        </span>
      </button>

      {isExpanded && (
        <div className="mt-4 text-base tracking-normal leading-6 text-neutral-500">
          <ul>
            <li>
              Producer:{" "}
              <a href={url} target="_blank" rel="noopener noreferrer" className="underline text-[#0052CE]">
                {producer || "Unknown"}
              </a>
            </li>
            <li>
              {/* <span className="text-neutral-500">Occasion: </span>
              <span className="text-black">
                Party decor for gatherings and celebrations
              </span> */}
            </li>
          </ul>
        </div>
      )}
    </section>
  );
};
