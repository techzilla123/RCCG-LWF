"use client";

interface AccordionItemProps {
  index: number;
  question: string;
  answer?: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  return (
    <article className="flex overflow-hidden flex-col justify-center p-4 w-full bg-white rounded-lg max-md:max-w-full">
      <button
        className="flex flex-wrap justify-between items-center w-full max-md:max-w-full"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <h3
          className="flex-1 text-left shrink self-stretch my-auto text-xl tracking-normal leading-8 text-black basis-0 max-md:max-w-full"
          style={{ fontWeight: "500" }}
        >
          {question}
        </h3>
        <span className="flex gap-2.5 justify-center items-center self-stretch my-auto w-5">
          <img
            src={isOpen ? "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/9427faf66673e4569f04d609029152f1e6030a8b?placeholderIfAbsent=true" : "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/259e787f127dbee6d284057d984923a32c885495?placeholderIfAbsent=true"}
            alt={isOpen ? "Collapse" : "Expand"}
            className="object-contain self-stretch my-auto w-5 aspect-square"
          />
        </span>
      </button>

      {isOpen && answer && (
        <p className="mt-4 text-base tracking-normal leading-6 text-neutral-500 max-md:max-w-full">
          {answer}
        </p>
      )}
    </article>
  );
}
