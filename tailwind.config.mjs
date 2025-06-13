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
        
        btn_colors: {
          primary: "#E2725B",
          accent: "#CC5C47",
          secondary: "#B94D3A",
          disabled: "#F3C4B9",
        },


        outline_colors: {
          100: "#E2725B",
          200: "#CC5C47",
          300: "#E2725B",
        },
      },
      boxShadow: {
        "custom-soft": "0px 4px 15px 0px rgba(226, 114, 91, 0.1)", // #E2725B at 10% opacity
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
