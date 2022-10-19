/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'base-shadow': '0px 0px 0px 4px rgba(240, 124, 132, 0.5)',
      }
    },
  },
  plugins: [],
};
