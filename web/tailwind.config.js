import { theme } from "tailwindcss/defaultConfig";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", ...theme.fontFamily.sans],
      },
      colors: {
        "blue-base": "#2C46B1",
        "blue-dark": "#2C4091",
        danger: "#B12C4D",
        gray: {
          100: "#F9F9FB",
          200: "#E4E6EC",
          300: "#CDCFD5",
          400: "#74798B",
          500: "#4D505C",
          600: "#1F2025",
        },
      },
      fontSize: {
        xl: "24px",
        lg: "18px",
        md: "14px",
        sm: "12px",
        xs: "10px",
      },
    },
  },
  plugins: [],
};
