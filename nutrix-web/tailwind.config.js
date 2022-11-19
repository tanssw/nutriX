/** @type {import('tailwindcss').Config} */
const { colors: defaultColors } = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'body': ['Sukhumvit', 'sans'],
      'medium': ['Sukhumvit-Medium', 'sans'],
      'bold': ['Sukhumvit-Bold', 'sans']
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
  safelist: [
    ...[Array(12).keys()].map(n => `col-span-${n + 1}`),
  ]
}
