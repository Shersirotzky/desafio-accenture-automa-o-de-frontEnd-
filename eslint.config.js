const globals = require('globals');
const cypress = require('eslint-plugin-cypress');

module.exports = [
  {
    ignores: [
      'node_modules/**',
      'reports/**',
      'cypress/videos/**',
      'cypress/screenshots/**',
      'cypress/downloads/**',
    ],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
    rules: { 'no-unused-vars': 'error', 'no-undef': 'error', eqeqeq: 'error' },
  },
  {
    files: ['cypress/**/*.js'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.mocha,
        ...cypress.configs.globals.languageOptions.globals,
      },
    },
    plugins: { cypress },
    rules: {
      'cypress/no-assigning-return-values': 'error',
      'cypress/no-unnecessary-waiting': 'error',
    },
  },
];
