module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb', 'plugin:react/recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '*.jsx',
        '.eslintrc.{cjs,js,jsx}',
      ],
      parser: '@babel/eslint-parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'script',
      },
    },
  ],
  plugins: ['react'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'max-len': ['error', { code: 120, ignoreComments: true }],
    'no-console': 'off',
    'no-restricted-exports': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
  },
};
