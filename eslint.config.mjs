import nextConfig from "eslint-config-next";
import coreWebVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier";

const eslintConfig = [
  ...nextConfig,
  ...coreWebVitals,
  prettier,
  {
    ignores: [
      "dist/",
      "public/",
      "jest/",
      "out/",
    ],
  },
];

export default eslintConfig;
