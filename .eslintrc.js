const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8')
);

module.exports = {
  extends: ['next', 'next/core-web-vitals', 'prettier'],
  plugins: ['prettier'],
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true
  },
  rules: {
    'prettier/prettier': [1, prettierOptions],
    'require-yield': 0,
    'no-unused-vars': 1,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0
  }
};
