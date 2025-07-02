"use client";
import * as React from "react";
import { FooterBrand } from "./Footer/FooterBrand";
import { FooterLinks } from "./Footer/FooterLinks";
import { FooterContact } from "./Footer/FooterContact";
import { FooterLegals } from "./Footer/FooterLegals";

function Footer() {
  return (
    <footer className="self-stretch bg-blue" style={{ background: "#00438C" }}>
      <div className="flex flex-wrap justify-between gap-y-10 px-8 md:px-20 lg:px-32 py-10 w-full">
        <FooterBrand />

        <FooterLinks
          title="Category"
          links={[
            "Balloons",
            "Birthday",
            "Holidays & Occasions",
            "Party Supplies",
            "Party Rentals",
            "Adults Specials",
            "Decorations",
          ]}
        />

        <FooterLinks title="Info" links={["About", "FAQ", "Contact", "Help"]} />

        <FooterContact />
      </div>

      <FooterLegals />
    </footer>
  );
}

export default Footer;
