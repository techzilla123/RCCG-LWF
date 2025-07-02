import { twMerge } from "tailwind-merge";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        `
        w-full
        max-w-[1250px]
        mx-auto
        px-4
        sm:px-8
        `,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
