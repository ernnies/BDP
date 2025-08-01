/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'crypto-green': '#00FF00',
        'crypto-purple': '#A100FF',
        'dark-bg': '#1A1A1A',
        'dark-card': '#2D2D2D',
        'text-muted': '#A0A0A0',
      },
    },
  },
  plugins: [],
};