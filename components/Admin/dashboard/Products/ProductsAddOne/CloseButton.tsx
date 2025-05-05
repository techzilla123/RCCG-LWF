import { CloseCircleIcon } from './Icons';

interface CloseButtonProps {
  onClick: () => void; // Function type that will be passed to handle the click event
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick} // Trigger the onClick function passed from parent component
    className="flex absolute top-4 right-4 justify-center items-center w-10 h-10 cursor-pointer max-md:top-3 max-md:right-3 max-md:w-9 max-md:h-9 max-sm:top-2 max-sm:right-2 max-sm:w-8 max-sm:h-8"
    aria-label="Close"
  >
    <CloseCircleIcon /> {/* The icon used in the button */}
  </button>
);
