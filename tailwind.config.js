/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px"
    },
    extend: {
      colors: {
        primary: "#1FC39E",
        ash: "#2B2B2B",
        yello: "#FAF2B1",
        blu: "#1EC49E",
        purp: "#F4E5F6",
        orang: "#FAF2B1",
        health: "#FEDEFF",
        nature: "#E3ACF9",
        tech: "#B9F3FC",
        dark: "#1c1c24",
        myPurple: "#8c6dfd"
      }
    },
  },
  plugins: [],
}
