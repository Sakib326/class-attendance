/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        xl: "1470px",
      },
      colors: {
        primary: "#002F5B",
        secondary: "#EA0519",
        tertiary: "#FAF2F5",
        grey: "#EEEEEE",
        greylight: "#F6F7FA",
        black: "#364a63",
        white: "#ffffff",
        danger: "#e50f0f",
      },
    },
  },
  container: {
    center: true,
  },
  plugins: [],
};
