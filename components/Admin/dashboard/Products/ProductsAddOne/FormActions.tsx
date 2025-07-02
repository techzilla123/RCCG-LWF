interface FormActionsProps {
  onCancel: () => void;
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious?: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  onPrevious,
  onNext,
  canGoPrevious = false,
}) => (
  <div className="flex gap-4 justify-end">
    <button
      onClick={onCancel} // Cancel action here
      className="p-4 text-base text-black cursor-pointer rounded-[50px] max-md:p-3 max-sm:p-2.5"
    >
      Cancel
    </button>
    <button
      onClick={onPrevious}
      disabled={!canGoPrevious}
      className={`p-4 text-base cursor-pointer rounded-[50px] ${canGoPrevious ? 'text-black' : 'text-stone-300'} max-md:p-3 max-sm:p-2.5`}
    >
      Previous
    </button>
    <button
      onClick={onNext}
      className="p-4 text-base text-white bg-blue-600 cursor-pointer rounded-[50px] max-md:p-3 max-sm:p-2.5"
    >
      Next
    </button>
  </div>
);
