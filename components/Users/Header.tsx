    "use client";

    import * as React from "react";
    import { ShopNavigation } from "./ShopHeader/ShopNavigation";
    import { Coiny } from "next/font/google";

    const coiny = Coiny({
      weight: "400",
      subsets: ["latin"],
    });

    const Header: React.FC = () => {
      const [activeTab, setActiveTab] = React.useState("");

      // Load tab from localStorage
      React.useEffect(() => {
        const savedTab = localStorage.getItem("activeShopTab");
        if (savedTab) setActiveTab(savedTab);
      }, []);

      // Save tab to localStorage
      React.useEffect(() => {
        if (activeTab) {
          localStorage.setItem("activeShopTab", activeTab);
        }
      }, [activeTab]);

      // 🔥 Match tab to category and save generalCategoryId
      // 🔥 Match tab to category and save generalCategoryId
    React.useEffect(() => {
      const fetchCategoryId = async () => {
        if (!activeTab) return;

        const token = localStorage.getItem("accessToken");
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/list-product-general-category`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
                ...(token ? { Authorization: token } : {}),
              },
            }
          );

          const data = await res.json();

          if (res.ok && data.statusCode === 200) {
            let match;

            // Special case for "Balloons shop"
            if (activeTab.toLowerCase().trim() === "balloons shop") {
              match = data.data.find(
                (cat: { name: string }) =>
                  cat.name.toLowerCase().trim() === "balloon"
              );
            } else {
              match = data.data.find(
                (cat: { name: string }) =>
                  cat.name.toLowerCase().trim() === activeTab.toLowerCase().trim()
              );
            }

            if (match) {
              localStorage.setItem("activeCategoryId", match.generalCategoryId);
              console.log("Saved Category ID:", match.generalCategoryId);
            }
          }
        } catch (err) {
          console.error("Failed to fetch category ID", err);
        }
      };

      fetchCategoryId();
    }, [activeTab]);


      return (
        <header className="relative flex flex-col items-center justify-center px-6 pt-10 bg-[#fff1f2] overflow-hidden max-md:px-4">
          <h1
            className={`${coiny.className} text-[48px] whitespace-nowrap z-10 max-md:text-4xl`}
            style={{
              color: "black",
              textShadow: `
                2px 2px 0 white,
                -2px -2px 0 white,
                2px -2px 0 white,
                -2px 2px 0 white,
                3px 3px 0 black
              `,
            }}
          >
            Shop
          </h1>

          <ShopNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

          <img
            src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/c90071b678c063a2a1f09e0cd49625d87ff56b40?placeholderIfAbsent=true"
            alt=""
            className="absolute -top-6 -left-2 z-0 w-[214px] h-[158px] object-contain pointer-events-none"
          />

          <img
            src="/bg-right.svg"
            alt=""
            className="absolute bottom-0 right-0 z-0 w-[200px] h-auto object-contain"
          />
        </header>
      );
    };

    export default Header;
