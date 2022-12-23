/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'base-shadow': '0px 0px 0px 4px rgba(240, 124, 132, 0.5)',
        'focus-shadow': '0px 0px 0 4px rgba(13, 110, 253, 0.25)',
      },
      screens: {        
  
        xxl: { min: "1500px" },

        xl: { min: "1200px" },

        llg: { min: "1050px" },

        lg: { min: "921px" },

        md: { max: "920px" },

        mob: { max: "780px" },
  
        lsm: { max: "620px" },

        sm: { max: "540px" },
      },
    },
  },
  plugins: [],
};
