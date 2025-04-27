import React from "react";

interface FooterLinksProps {
  title: string;
  links: string[];
}

export const FooterLinks: React.FC<FooterLinksProps> = ({ title, links }) => {
  // Map each link name to the correct href
  const getHref = (link: string) => {
    switch (link) {
      case "Balloons":
        return "/shop/balloon";
      case "Birthday":
        return "/shop/birthday";
      case "Holidays & Occasions":
        return "/shop/holiday";
      case "Party Supplies":
        return "/shop/party-supplies";
      case "Party Rentals":
        return "/rentals";
      case "Adults Specials":
        return "/shop";
      case "Decorations":
        return "/shop/decorations";
      default:
        return "#"; // fallback
    }
  };

  return (
    <nav className="flex flex-col min-w-[200px] max-w-[250px] flex-1 text-left">
      <h2 className="text-base font-semibold text-blue-300">{title}</h2>
      <ul className="flex flex-col mt-4 text-white">
        {links.map((link, index) => (
          <li
            key={index}
            className="w-full p-2 rounded-[50px] hover:text-blue-300 transition-colors"
          >
            <a href={getHref(link)}>{link}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
