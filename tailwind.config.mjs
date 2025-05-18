/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E2725B",
        secondary: "#F9E3DE",
        border_dark: "#89888B",
        border_light: "#F9E3DE",
      },
      screens: {
        base: "0px",
        sm: "640px",
        md: "900px",
        "2md": "1000px",
        lg: "1100px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
        "4xl": "2560px",
      },
    },
  },
  plugins: [],
};

export default config;
