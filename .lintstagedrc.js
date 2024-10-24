const config = {
  '**/*.{mjs,cjs,js,jsx,mdx,md}': ['yarn lint-js:fix', 'yarn prettier:fix'],
  '**/*.{css,scss}': ['yarn lint-css:fix', 'yarn prettier:fix'],
  '**/*.json': ['yarn prettier:fix'],
};

export default config;
