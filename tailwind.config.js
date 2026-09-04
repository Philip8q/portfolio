/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          bg: "#FAF9F6",
          card: "#FFFFFF",
          text: "#1A1A2E",
          secondary: "#6B7280",
          accent: "#2563EB",
          "accent-hover": "#1D4ED8",
          border: "#E5E7EB",
        },
        dark: {
          bg: "#0F0F23",
          card: "#1A1A2E",
          text: "#E2E8F0",
          secondary: "#94A3B8",
          accent: "#60A5FA",
          "accent-hover": "#93C5FD",
          border: "#2D2D44",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
