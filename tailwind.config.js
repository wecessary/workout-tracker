/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: { sans: ["Helvetica", "Arial", "sans-serif"] },
    extend: {
      backgroundImage: {
        "mobile-bg": "url('/src/assets/mobile-background.jpg')",
        "desktop-bg": "url('/src/assets/desktop-background.jpg')",
      },
      colors: {
        "app-yellow": {
          100: "#fff3ca",
          200: "#fcde79",
          500: "#ffca43",
        },
      },
      fontFamily: {
        quinton: "Quinton",
      },
    },
  },
  variants: {},
  plugins: [],
};
