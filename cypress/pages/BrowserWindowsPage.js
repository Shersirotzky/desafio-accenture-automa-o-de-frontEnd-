class BrowserWindowsPage {
  openNewWindow() {
    expect(Cypress.browser.family, 'Real windows require Chromium').to.equal(
      'chromium',
    );
    cy.puppeteer('rememberWindows');
    cy.get('#windowButton').should('be.visible').click();
  }

  assertRealWindowAndClose() {
    cy.puppeteer('validateAndCloseNewWindow').should('deep.equal', {
      opened: true,
      text: 'This is a sample page',
      closed: true,
    });
    cy.get('#windowButton').should('be.visible');
    cy.location('pathname').should('eq', '/browser-windows');
  }
}

export default new BrowserWindowsPage();
