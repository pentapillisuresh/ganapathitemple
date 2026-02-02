/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFF9EC',
          50: '#FFFEFB',
          100: '#FFFDF8',
          200: '#FFFBF1',
          300: '#FFF9EA',
          400: '#FFF7E3',
          500: '#FFF9EC', // Primary color
          600: '#E6E0D4',
          700: '#CCC7BD',
          800: '#B3AEA5',
          900: '#99958E'
        },
        secondary: {
          DEFAULT: '#EA580C',
          50: '#FEF3E7',
          100: '#FDE6CF',
          200: '#FACBA0',
          300: '#F6AF70',
          400: '#F19441',
          500: '#EA580C', // Secondary color
          600: '#D4500B',
          700: '#BD480A',
          800: '#A74009',
          900: '#903808'
        }
      },
      backgroundColor: {
        'primary': '#FFF9EC',
        'secondary': '#EA580C',
      },
      textColor: {
        'primary': '#FFF9EC',
        'secondary': '#EA580C',
      },
      borderColor: {
        'primary': '#FFF9EC',
        'secondary': '#EA580C',
      }
    },
  },
  plugins: [],
}