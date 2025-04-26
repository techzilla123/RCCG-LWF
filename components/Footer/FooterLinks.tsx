import React from "react";

interface FooterLinksProps {
  title: string;
  links: string[];
}

export const FooterLinks: React.FC<FooterLinksProps> = ({ title, links }) => {
  return (
    <nav className="flex flex-col min-w-[200px] max-w-[250px] flex-1 text-left">
      <h2 className="text-base font-semibold text-blue-300">{title}</h2>
      <ul className="flex flex-col mt-4 text-white">
        {links.map((link, index) => (
          <li key={index} className="w-full p-2 rounded-[50px] hover:text-blue-300 transition-colors">
            <a href="#">{link}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
