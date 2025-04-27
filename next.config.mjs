/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: '/favicon-v2.png', // Define the path to the new favicon
          headers: [
            {
              key: 'Cache-Control', // Set cache control headers
              value: 'public, max-age=0, must-revalidate', // Prevent caching
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  