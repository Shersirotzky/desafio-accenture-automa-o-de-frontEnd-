class SortablePage {
  items = '#demo-tabpane-list .list-group-item';

  moveBefore(label, targetIndex) {
    cy.window().then((win) => {
      const dataTransfer = new win.DataTransfer();
      cy.contains(this.items, new RegExp(`^${label}$`)).trigger('dragstart', {
        dataTransfer,
      });
      cy.get(this.items)
        .eq(targetIndex)
        .then(($target) => {
          const box = $target[0].getBoundingClientRect();
          const options = {
            dataTransfer,
            clientX: box.left + box.width / 2,
            clientY: box.top + 2,
          };
          cy.wrap($target)
            .trigger('dragenter', options)
            .trigger('dragover', options)
            .trigger('drop', options);
        });
      cy.contains(this.items, new RegExp(`^${label}$`)).trigger('dragend', {
        dataTransfer,
      });
    });
  }

  scramble() {
    cy.get('#demo-tab-list').click();
    cy.get('#demo-tabpane-list').scrollIntoView();
    this.moveBefore('Six', 0);
    cy.get(this.items).first().should('have.text', 'Six');
  }

  sort(order) {
    order.forEach((label, index) => {
      cy.get(this.items).then(($items) => {
        if ($items[index].textContent.trim() !== label) {
          this.moveBefore(label, index);
        }
      });
      cy.get(this.items).eq(index).should('have.text', label);
    });
  }

  assertOrder(order) {
    cy.get(this.items).should(($items) => {
      expect([...$items].map((item) => item.textContent.trim())).to.deep.equal(
        order,
      );
    });
  }
}

export default new SortablePage();
