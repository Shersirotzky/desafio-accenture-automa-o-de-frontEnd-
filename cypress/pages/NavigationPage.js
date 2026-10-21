class NavigationPage {
  openHome() {
    cy.visit('/');
    cy.get('.home-body').should('be.visible');
  }

  openMenu(category, submenu) {
    cy.contains('.card', category).should('be.visible').click();
    cy.contains('.element-group', category).within(() => {
      cy.contains('.menu-list .text', submenu).scrollIntoView().click();
    });
    cy.get('h1').should('have.text', submenu);
  }
}

export default new NavigationPage();
