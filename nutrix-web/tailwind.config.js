/** @type {import('tailwindcss').Config} */
const { colors: defaultColors } = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'body': ['Sukhumvit', 'sans']
    },
    extend: {
      colors: {
        ...defaultColors,
        ...{
          'pri-100': '#CFEBE4',
          'pri-500': '#23A485',
          'sec-500': '#E98583',
          'tri-500': '#F7D39A',
        }
      }
    },
  },
  plugins: [],
}
