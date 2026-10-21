import '@cypress/puppeteer/support';

beforeEach(() => {
  [
    '**/*.doubleclick.net/**',
    '**/*.googlesyndication.com/**',
    '**/www.google-analytics.com/**',
  ].forEach((url) => {
    cy.intercept(url, { statusCode: 204, body: '' });
  });
});
