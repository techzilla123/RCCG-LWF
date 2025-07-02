import { ArrowLeftIcon, ArrowRightIcon, DotsIcon } from "./Icons";

export const Pagination = () => {
  return (
    <nav
      className="flex gap-1 justify-center items-center mt-6 max-md:flex-col max-md:items-start max-sm:flex-col max-sm:items-start"
      aria-label="Pagination"
    >
      <button
        className="flex justify-center items-center w-6 h-6"
        aria-label="Previous page"
      >
        <ArrowLeftIcon />
      </button>

      <div className="flex gap-1 items-center">
        <button
          className="w-6 h-6 text-sm text-black bg-gray-200 rounded"
          aria-current="page"
        >
          1
        </button>
        <button className="w-6 h-6 text-sm text-black bg-gray-200 rounded">
          2
        </button>
        <button className="w-6 h-6 text-sm text-black bg-gray-200 rounded">
          3
        </button>

        <span className="flex justify-center items-center w-6 h-6">
          <DotsIcon />
        </span>

        <button className="w-6 h-6 text-sm text-black bg-gray-200 rounded">
          10
        </button>
      </div>

      <button
        className="flex justify-center items-center w-6 h-6"
        aria-label="Next page"
      >
        <ArrowRightIcon />
      </button>
    </nav>
  );
};
