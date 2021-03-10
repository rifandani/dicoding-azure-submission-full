const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    'src/components/**/*.{js,ts,jsx,tsx}',
    'src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media', // 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blueGray: colors.blueGray,
        trueGray: colors.trueGray,
        lime: colors.lime,
        teal: colors.teal,
        cyan: colors.cyan,
        fuchsia: colors.fuchsia,
        rose: colors.rose,
      },
      // fontFamily: {
      //   sans: ['Graphik', 'sans-serif'],
      //   serif: ['Merriweather', 'serif'],
      // },
      spacing: {
        72: '18rem',
        80: '20rem',
      },
      padding: {
        '5/6': '83.3333333%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
