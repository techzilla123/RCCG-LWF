// ServiceCard.tsx
import React from "react";
import { Button } from "./Button";

interface ServiceCardProps {
  title?: string;
  imageSrc: string;
  description: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  imageSrc,
  description,
}) => {
  return (
    <article className="flex flex-col items-start bg-white rounded-2xl overflow-hidden shadow-sm transition hover:shadow-md duration-300">
      <img
        src={imageSrc}
        alt={title}
        className="w-full object-cover aspect-[1.6/1] rounded-t-2xl"
      />
      <div className="flex flex-col gap-4 p-6">
        {title && <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>}
        <p className="text-gray-700 leading-relaxed text-base">{description}</p>
        <Button variant="outline" className="mt-4 self-start">
          <span>Learn More</span>
          <img
            src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/29b16f3f8673f94062503389880d981c0f08f381?placeholderIfAbsent=true"
            alt=""
            className="w-4 h-4"
          />
        </Button>
      </div>
    </article>
  );
};
