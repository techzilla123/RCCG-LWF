import React from 'react';

interface FormHeaderProps {
  step: number;
  totalSteps: number;
  title: string;
  subtitle: string;
}

export const FormHeader: React.FC<FormHeaderProps> = ({
  step,
  totalSteps,
  title,
  subtitle,
}) => {
  return (
    <header className="flex flex-col gap-2">
      <div className="flex gap-1 items-center text-base">
        <span className="font-bold text-blue-600">{step}/{totalSteps}</span>
        <span className="text-neutral-500">{subtitle}</span>
      </div>
      <h1 className="text-3xl font-semibold text-black">{title}</h1>
    </header>
  );
};