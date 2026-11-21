import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          DEFAULT: "#C2622B",
          dark: "#A24A1A",
          cinnamon: "#8E3F15",
          light: "#F9CDBF",
        },
        cocoa: {
          DEFAULT: "#2A170E",
          dark: "#24130B",
          light: "#5A3A28",
        },
        milk: {
          DEFAULT: "#FFFDF8",
          cream: "#FBF7F0",
        },
        peach: {
          DEFAULT: "#FFF1D8",
          light: "#FFF8EA",
        },
        amber: {
          DEFAULT: "#F2BE6B",
          light: "#FBE3B4",
        },
        forest: {
          DEFAULT: "#1F7A4D",
          dark: "#1F5D3A",
          light: "#E3F4E8",
        },
        sky: {
          DEFAULT: "#BFDDF5",
          dark: "#2F6E9E",
        },
        stamp: {
          red: "#B3261E",
          light: "#FDE7E5",
        },
      },
      fontFamily: {
        fraunces: ["var(--font-fraunces)", "Fraunces", "serif"],
        figtree: ["var(--font-figtree)", "Figtree", "sans-serif"],
        shantell: ["var(--font-shantell)", "Shantell Sans", "cursive"],
      },
      maxWidth: {
        "screen-wide": "110rem", // 1760px
        "screen-standard": "96rem", // 1536px
      },
      boxShadow: {
        "hard-offset": "0px 8px 0px -2.4px #2A170E",
        "card-offset": "0px 10px 0px -2px rgba(42, 23, 14, 0.15)",
        "polaroid": "0px 12px 24px -6px rgba(42, 23, 14, 0.12)",
      },
      borderRadius: {
        door: "100px 100px 14px 14px",
      },
    },
  },
  plugins: [],
};

export default config;
