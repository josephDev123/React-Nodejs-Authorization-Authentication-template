/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customGreen: "#54B992",
        customBlack: "#000000",
        customDarkGray: "#5B5F66",
        customLightGray: "#F5F5F5",
        customWhite: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
