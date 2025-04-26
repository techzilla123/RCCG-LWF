import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="flex items-center w-full max-w-md bg-stone-50 px-4 py-2 rounded-full min-h-10">
      <Search className="w-5 h-5 text-stone-400" />
      <input
        type="text"
        placeholder="Search..."
        className="ml-2 w-full bg-transparent outline-none text-base text-stone-500 placeholder-stone-400"
      />
    </div>
  );
};
