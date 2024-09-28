/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#BB86FC',
        secondary: '#03DAC6',
        background: '#121212',
        header: '#282828',
        footer: '#282828',
        text: '#E0E0E0',
        accent: '#FFAB40', // Amber accent color
        selected: '#FF5722', // Orange for selected items
        unselected: '#4B5563', // Gray for unselected items
      },
    },
  },
  plugins: [],
};


