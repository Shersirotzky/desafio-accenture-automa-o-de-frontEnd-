class WebTablesPage {
  showAllRows() {
    cy.get('.web-tables-wrapper .pagination select').select('50');
  }

  search(email = '') {
    cy.get('#searchBox').clear();
    if (email) cy.get('#searchBox').type(email);
  }

  snapshot() {
    return cy
      .get('.web-tables-wrapper tbody tr')
      .then(($rows) =>
        [...$rows]
          .map((row) =>
            [...row.querySelectorAll('td')]
              .slice(0, 6)
              .map((cell) => cell.textContent.trim()),
          )
          .filter((cells) => cells[3]),
      );
  }

  fillAndSubmit(data) {
    cy.get('.modal-content').should('be.visible');
    ['firstName', 'lastName', 'age', 'salary', 'department'].forEach(
      (field) => {
        cy.get(`#${field}`).clear().type(data[field]);
      },
    );
    cy.get('#userEmail').clear().type(data.email);
    cy.get('#submit').click();
    cy.get('.modal-content').should('not.exist');
  }

  create(data) {
    cy.get('#addNewRecordButton').click();
    this.fillAndSubmit(data);
  }

  assertRecord(data) {
    cy.contains('.web-tables-wrapper tbody tr', data.email).within(() => {
      cy.get('td').then(($cells) => {
        const actual = [...$cells]
          .slice(0, 6)
          .map((cell) => cell.textContent.trim());
        expect(actual).to.deep.equal([
          data.firstName,
          data.lastName,
          data.age,
          data.email,
          data.salary,
          data.department,
        ]);
      });
    });
  }

  edit(data) {
    this.search(data.email);
    cy.contains('.web-tables-wrapper tbody tr', data.email)
      .find('[title="Edit"]')
      .click();
    this.fillAndSubmit(data);
    this.assertRecord(data);
  }

  delete(email) {
    this.search();
    this.snapshot().then((before) => {
      expect(
        before.filter((row) => row[3] === email),
        'Exactly one target record',
      ).to.have.length(1);
      const expected = before.filter((row) => row[3] !== email);
      this.search(email);
      cy.contains('.web-tables-wrapper tbody tr', email)
        .find('[title="Delete"]')
        .click();
      cy.contains('.web-tables-wrapper tbody tr', email).should('not.exist');
      this.search();
      this.snapshot().should('deep.equal', expected);
    });
  }

  deleteCreated(records, originalRows) {
    const emails = new Set(records.map((record) => record.email));
    this.search();
    this.snapshot().then((before) => {
      const originals = before.filter((row) => !emails.has(row[3]));
      expect(originals, 'Original records preserved').to.deep.equal(
        originalRows,
      );
      const remaining = before.filter((row) => emails.has(row[3]));
      if (remaining.length === 0) {
        expect(before, 'All created records removed').to.deep.equal(
          originalRows,
        );
        return;
      }
      const email = remaining[0][3];
      this.search(email);
      cy.contains('.web-tables-wrapper tbody tr', email)
        .find('[title="Delete"]')
        .click();
      cy.contains('.web-tables-wrapper tbody tr', email).should('not.exist');
      this.search();
      this.snapshot().then((after) => {
        expect(
          after.length,
          'Deletion reduced the number of records',
        ).to.be.lessThan(before.length);
        if (before.length - after.length > 1) {
          cy.log(
            `DemoQA removeu ${before.length - after.length} registros criados com um clique em Delete`,
          );
        }
      });
      this.deleteCreated(records, originalRows);
    });
  }
}

export default new WebTablesPage();
