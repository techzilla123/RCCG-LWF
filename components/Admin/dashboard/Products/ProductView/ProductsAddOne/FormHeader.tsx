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
  }) => (
    <header className="flex flex-col gap-2 max-md:gap-1.5 max-sm:gap-1">
      <div className="flex gap-1 items-center text-base">
        <span className="font-bold text-blue-600">
          {step}/{totalSteps}
        </span>
        <span className="text-neutral-500">{subtitle}</span>
      </div>
      <h1 className="text-3xl font-semibold text-black max-md:text-3xl max-sm:text-2xl">
        {title}
      </h1>
    </header>
  );