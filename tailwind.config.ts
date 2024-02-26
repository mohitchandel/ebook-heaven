import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        League: ["League Spartan"],
        Serif: ["DM Serif Display"],
      },
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        dark: "#27272A",
        base: "#52525B",
        blue: "#006FEE",
        green: "#45D483",
        neon: "#17C964",
        red: "#F31260",
      },
    },
  },
  plugins: [nextui()],
};
export default config;
