// next.config.js
const nextConfig = {
  images: {
    domains: ["api.partyplaceandrentals.com"],
  },
  async headers() {
    return [
      {
        source: "/favicon-v2.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
