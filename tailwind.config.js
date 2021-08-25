module.exports = {
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      grayscale: {
        50: '50%',
        35: '35%',
        25: '25%',
      },
    },
  },
  variants: {
    extend: {
      scale: ['active', 'group-hover'],
      filter: ['group-hover'],
      grayscale: ['group-hover'],
    },
  },
  plugins: [],
}
