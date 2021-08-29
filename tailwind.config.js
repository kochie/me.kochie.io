const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      transitionDelay: {
        0: '0ms',
      },
      grayscale: {
        50: '50%',
        35: '35%',
        25: '25%',
      },
      colors: {
        'light-blue': colors.lightBlue,
        cyan: colors.cyan,
        gitlab: '#db3b21',
        medium: '#000000',
        github: '#333333',
        instagram: '#833ab4',
        twitter: '#1da1f2',
        linkedin: '#0077b5',
        mastodon: '#008ada',
        cottonBureau: '#f26355',
        orange: colors.orange,
        wheat: 'wheat',
        'warm-gray': colors.warmGray,
        'cool-gray': colors.coolGray,
        amber: colors.amber,
      },
      backgroundImage: {
        'city-image': "url('/images/background-1.webp')",
        'airplane-image': "url('/images/background.webp')",
      },
    },
  },
  variants: {
    extend: {
      scale: ['active', 'group-hover'],
      filter: ['group-hover'],
      grayscale: ['group-hover'],
      animation: ['hover', 'focus', 'group-hover'],
      transitionDelay: ['group-hover'],
      typography: ['dark'],
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
