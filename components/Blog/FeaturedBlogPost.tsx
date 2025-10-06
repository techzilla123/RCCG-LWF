import * as React from "react";

interface FeaturedBlogPostProps {
  image: string;
  altText: string;
  title: string;
  readTime: string;
  date: string;
}

export function FeaturedBlogPost({
  image,
  altText,
  title,
  readTime,
  date
}: FeaturedBlogPostProps) {
  return (
    <article className="overflow-hidden bg-white rounded-xl shadow-sm">
      <img
        src={image}
        alt={altText}
        className="w-full h-[400px] object-cover"
      />
      <div className="p-8">
        <h2 className="mb-3 text-3xl font-semibold text-gray-900 max-sm:text-2xl">
          {title}
        </h2>
        <div className="flex gap-2 items-center text-sm text-gray-500">
          {readTime}•{date}
        </div>
      </div>
    </article>
  );
}
