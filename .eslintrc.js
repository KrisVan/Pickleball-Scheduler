module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  overrides: [
    {
      // For test files, disable `no-undef` for vitest vars
      files: ['**/*.test.jsx'],
      rules: {
        'no-undef': 'off',
      },
    },
    {
      env: {
        node: true,
      },
      files: [
        '*.jsx',
        '.eslintrc.{cjs,js,jsx}',
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
      },
    },
  ],
  plugins: ['react', 'react-hooks'],
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
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
