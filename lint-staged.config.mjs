// lint-staged.config.js
const config = {
  '**/*.{js,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '**/*.{json,md,css}': ['prettier --write'],
};

export default config;
