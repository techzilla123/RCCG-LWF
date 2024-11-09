import { Inter, Roboto } from "@next/font/google";

// TypeScript will automatically infer the types for these font imports
export const inter = Inter({
  subsets: ["latin"],
  weight: ["600", "500"],
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"],
});
