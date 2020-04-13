module.exports = {
  plugins: {
    // "postcss-css-variables": {},
    "postcss-custom-media": {
      importFrom: [
        () => {
          const mobileWidth = 420
          const mobileHeight = 850
          const tabletWidth = 1025
          const tabletHeight = 1366
          // const resolution = 1
          // const mobileDpr = 2

          const customMedia = {
            "--tablet-size": `(max-width: ${tabletWidth}px) and (max-height: ${tabletHeight}px), (max-width: ${tabletHeight}px) and (max-height: ${tabletWidth}px)`,
            "--mobile-size": `(max-width: ${mobileWidth}px) and (max-height: ${mobileHeight}px), (max-width: ${mobileHeight}px) and (max-height: ${mobileWidth}px)`
          }

          return { customMedia }
        }
      ]
    }
  }
};
