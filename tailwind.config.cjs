module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './mdx-components.tsx'],
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
        gitlab: '#db3b21',
        medium: '#000000',
        github: '#333333',
        instagram: '#833ab4',
        twitter: '#1da1f2',
        linkedin: '#0077b5',
        mastodon: '#008ada',
        cottonBureau: '#f26355',
        wheat: 'wheat',
      },
      backgroundImage: {
        'city-image': "url('/images/background-1.webp')",
        'airplane-image': "url('/images/background.webp')",
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
