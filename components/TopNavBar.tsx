import { Logo } from "./TopNavBar/Logo";
import { NavigationLinks } from "./TopNavBar/NavigationLinks";
import { SearchBar } from "./TopNavBar/SearchBar";
import { LanguageSelector } from "./TopNavBar/LanguageSelector";
import { UserActions } from "./TopNavBar/UserActions";

export default function TopNavBar() {
  return (
    <header className="relative flex items-center justify-between px-8 py-4 bg-white border-b border-gray-300 max-md:flex-wrap max-md:gap-4">
      <div className="flex items-center gap-6">
        <Logo />
        <NavigationLinks />
      </div>

      <div className="flex items-center gap-4 flex-1 justify-end max-md:w-full max-md:justify-between">
        <SearchBar />
        <LanguageSelector />
        <UserActions />
      </div>
    </header>
  );
}
