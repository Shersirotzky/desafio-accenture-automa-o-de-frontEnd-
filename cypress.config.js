const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const {
  addCucumberPreprocessorPlugin,
} = require('@badeball/cypress-cucumber-preprocessor');
const {
  createEsbuildPlugin,
} = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const { setup } = require('@cypress/puppeteer');
const puppeteer = require('puppeteer-core');
const browserWindows = require('./cypress/plugins/browser-windows');

module.exports = defineConfig({
  viewportWidth: 1440,
  viewportHeight: 1100,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  video: true,
  screenshotOnRunFailure: true,
  retries: 0,
  e2e: {
    baseUrl: 'https://demoqa.com',
    specPattern: 'cypress/e2e/features/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        'file:preprocessor',
        createBundler({ plugins: [createEsbuildPlugin(config)] }),
      );
      setup({ on, puppeteer, onMessage: browserWindows });
      return config;
    },
  },
});
