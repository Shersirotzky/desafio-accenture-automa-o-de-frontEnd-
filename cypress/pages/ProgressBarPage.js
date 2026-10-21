class ProgressBarPage {
  startAndPause() {
    cy.get('[role="progressbar"]').should('have.attr', 'aria-valuenow', '0');
    cy.clock(Date.now(), ['setInterval', 'clearInterval']);
    cy.get('#startStopButton').click().should('have.text', 'Stop');
    cy.tick(1000);
    cy.get('[role="progressbar"]').should(($bar) => {
      const value = Number($bar.attr('aria-valuenow'));
      expect(value, 'Progress actually started').to.be.greaterThan(0);
      expect(value, 'Progress before stop').to.be.lessThan(25);
    });
    cy.get('#startStopButton').click().should('have.text', 'Start');
  }

  assertPaused() {
    cy.get('[role="progressbar"]')
      .invoke('attr', 'aria-valuenow')
      .then((paused) => {
        expect(Number(paused)).to.be.within(1, 25);
        cy.tick(2000);
        cy.get('[role="progressbar"]').should(
          'have.attr',
          'aria-valuenow',
          paused,
        );
      });
  }

  complete() {
    cy.get('#startStopButton').click();
    this.advanceUntilComplete();
    cy.get('[role="progressbar"]')
      .should('have.attr', 'aria-valuenow', '100')
      .and('have.text', '100%');
  }

  advanceUntilComplete() {
    cy.get('[role="progressbar"]')
      .invoke('attr', 'aria-valuenow')
      .then((current) => {
        if (Number(current) < 100) {
          cy.tick(100);
          cy.get('[role="progressbar"]').should(
            'have.attr',
            'aria-valuenow',
            String(Number(current) + 1),
          );
          this.advanceUntilComplete();
        }
      });
  }

  reset() {
    cy.get('#resetButton').should('be.visible').click();
    cy.get('[role="progressbar"]').should('have.attr', 'aria-valuenow', '0');
    cy.get('#startStopButton').should('have.text', 'Start');
  }
}

export default new ProgressBarPage();
