import * as React from "react";

interface BlogPostProps {
  image: string;
  altText: string;
  title: string;
  readTime: string;
  date: string;
}

export function BlogPost({
  image,
  altText,
  title,
  readTime,
  date
}: BlogPostProps) {
  return (
    <article className="flex overflow-hidden gap-6 bg-white rounded-xl shadow-sm max-sm:flex-col">
      <div className="w-[200px] h-[200px] max-sm:w-full max-sm:h-[240px]">
        <img
          src={image}
          alt={altText}
          className="w-full h-full object-fill"
        />
      </div>
      <div className="flex-1 p-8 max-sm:p-6">
        <h3 className="mb-3 text-2xl font-semibold text-gray-900 max-sm:text-xl">
          {title}
        </h3>
        <div className="flex gap-2 items-center text-sm text-gray-500">
          {readTime}•{date}
        </div>
      </div>
    </article>
  );
}
