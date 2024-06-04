import polkadotBrandColors from "./src/config/polkadot-brand-colors"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["selector", '[data-mode="dark"]'],
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        accent: polkadotBrandColors.pink,
        primary: polkadotBrandColors.pink,
        ...polkadotBrandColors,
      },
      fontFamily: {
        display: "unbounded, ui-serif",
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: polkadotBrandColors.pink[500],
            },
            h1: {
              fontFamily: "unbounded",
            },
            h2: {
              fontFamily: "unbounded",
            },
            h3: {
              fontFamily: "unbounded",
            },
            h4: {
              fontFamily: "unbounded",
            },
          },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        "mini-ping": "mini-ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        "mini-ping": {
          "75%, 100%": { transform: "scale(1.3)", opacity: 0 },
        },
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("flowbite-typography")],
}
