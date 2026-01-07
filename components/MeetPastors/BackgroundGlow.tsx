import type React from "react"

export const BackgroundGlow: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0"
        dangerouslySetInnerHTML={{
          __html: `
            <svg
              viewBox="0 0 1468 615"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
              style="
                position:absolute;
                inset:0;
                width:100%;
                height:100%;
              "
            >
              <!-- Softened background using SAME color -->
              <defs>
                <linearGradient id="bgFade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#0F0B0C" stop-opacity="0.85"/>
                  <stop offset="50%" stop-color="#0F0B0C" stop-opacity="0.6"/>
                  <stop offset="100%" stop-color="#0F0B0C" stop-opacity="0.85"/>
                </linearGradient>
              </defs>

              <rect width="1468" height="615" fill="url(#bgFade)" />

              <mask id="mask0" maskUnits="userSpaceOnUse" x="0" y="0" width="1468" height="615">
                <rect width="1468" height="615" fill="white" />
              </mask>

              <g mask="url(#mask0)">
                <g filter="url(#filter0)">
                  <ellipse cx="1310.5" cy="260.5" rx="145.271" ry="142.5" fill="#4399E2" fill-opacity="0.4"/>
                </g>

                <g filter="url(#filter1)">
                  <ellipse cx="426.638" cy="144.5" rx="118.765" ry="116.5" fill="#FEBF00" fill-opacity="0.4"/>
                </g>

                <g filter="url(#filter2)">
                  <ellipse cx="1021.99" cy="417.5" rx="104.493" ry="102.5" fill="#FEBF00" fill-opacity="0.4"/>
                </g>
              </g>

              <defs>
                <filter id="filter0" x="865.225" y="-182" width="890.541" height="885" filterUnits="userSpaceOnUse">
                  <feGaussianBlur stdDeviation="150"/>
                </filter>

                <filter id="filter1" x="7.87305" y="-272" width="837.531" height="833" filterUnits="userSpaceOnUse">
                  <feGaussianBlur stdDeviation="150"/>
                </filter>

                <filter id="filter2" x="617.5" y="15" width="808.986" height="805" filterUnits="userSpaceOnUse">
                  <feGaussianBlur stdDeviation="150"/>
                </filter>
              </defs>
            </svg>
          `,
        }}
      />
    </div>
  )
}
