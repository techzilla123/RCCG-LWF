// next.config.mjs
const nextConfig = {
  images: {
    domains: ["api.partyplaceandrentals.com"],
  },
  async headers() {
    return [
      {
        source: "/favicon-v3.ico",
        headers: [
          {
            key: "Cache-Control",
            // 🚫 absolutely no caching
            value: "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
