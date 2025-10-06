import * as React from "react";

interface BlogHeaderProps {
  title: string;
  description: string;
}

export function BlogHeader({ title, description }: BlogHeaderProps) {
  return (
    <header className="mb-12 text-center">
      <h1 className="mb-4 text-5xl font-bold text-gray-900 max-sm:text-4xl">
        {title}
      </h1>
      <p className="text-lg text-gray-500 max-sm:text-base">
        {description}
      </p>
    </header>
  );
}
