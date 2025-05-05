import * as React from "react";

interface ActionButtonsProps {
  onCancel: () => void;
}

export const ActionButtons = ({ onCancel }: ActionButtonsProps) => {
  const [isSaved, setIsSaved] = React.useState(false);

  const handleSave = () => {
    setIsSaved(true);
  };

  const handleEdit = () => {
    setIsSaved(false);
  };

  return (
    <section className="flex items-center justify-between mt-6 w-full text-base font-medium tracking-normal text-center">
      {!isSaved ? (
        <>
          <button
            className="text-base text-black leading-[24px]"
            onClick={onCancel}
          >
            Cancel
          </button>
          <div className="flex-1" />
          <button
            className="px-4 py-0 h-14 text-base font-medium text-white bg-blue-600 cursor-pointer rounded-[50px]"
            onClick={handleSave}
          >
            Save product
          </button>
        </>
      ) : (
        <>
          <div className="flex gap-6 items-center">
            <button className="text-base text-red-500 leading-[24px]">
              Delete
            </button>
            <button className="text-base text-black leading-[24px]">
              Disable
            </button>
          </div>
          <button
            onClick={handleEdit}
            className="px-6 py-2 h-14 text-base font-medium text-white bg-blue-600 cursor-pointer rounded-[50px]"
          >
            Edit
          </button>
        </>
      )}
    </section>
  );
};
