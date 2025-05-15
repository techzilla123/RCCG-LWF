interface IconButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    ariaLabel: string;
  }
  
  export const IconButton: React.FC<IconButtonProps> = ({
    onClick,
    children,
    ariaLabel,
  }) => {
    return (
      <button
        onClick={onClick}
        className="flex justify-center items-center p-1 bg-white rounded-[50px]"
        aria-label={ariaLabel}
      >
        {children}
      </button>
    );
  };
  