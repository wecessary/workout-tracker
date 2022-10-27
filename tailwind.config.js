/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "app-yellow": {
          100: "#fff3ca",
          500: "#ffca43",
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
