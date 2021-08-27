const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      typography: (theme) => ({
        light: {
          css: [
            {
              color: theme('colors.gray.400'),
              '[class~="lead"]': {
                color: theme('colors.gray.300'),
              },
              a: {
                color: theme('colors.white'),
              },
              strong: {
                color: theme('colors.white'),
              },
              'ol > li::before': {
                color: theme('colors.gray.400'),
              },
              'ul > li::before': {
                backgroundColor: theme('colors.gray.600'),
              },
              hr: {
                borderColor: theme('colors.gray.200'),
              },
              blockquote: {
                color: theme('colors.gray.200'),
                borderLeftColor: theme('colors.gray.600'),
              },
              h1: {
                color: theme('colors.white'),
              },
              h2: {
                color: theme('colors.white'),
              },
              h3: {
                color: theme('colors.white'),
              },
              h4: {
                color: theme('colors.white'),
              },
              'figure figcaption': {
                color: theme('colors.gray.400'),
              },
              code: {
                color: theme('colors.white'),
              },
              'a code': {
                color: theme('colors.white'),
              },
              pre: {
                color: theme('colors.gray.200'),
                backgroundColor: theme('colors.gray.800'),
              },
              thead: {
                color: theme('colors.white'),
                borderBottomColor: theme('colors.gray.400'),
              },
              'tbody tr': {
                borderBottomColor: theme('colors.gray.600'),
              },
            },
          ],
        },
      }),
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
        wheat: 'wheat',
        'warm-gray': colors.warmGray,
        'cool-gray': colors.coolGray,
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
  plugins: [require('@tailwindcss/typography')],
}
