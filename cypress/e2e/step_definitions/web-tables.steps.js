import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import tables from '../../pages/WebTablesPage';
import { employee } from '../../support/dataFactory';

When('guardo os registros originais da tabela', () => {
  tables.showAllRows();
  tables.snapshot().as('originalRows');
});
When('crio um registro aleatório na tabela', () => {
  const record = employee();
  cy.wrap(record).as('record');
  tables.create(record);
});
Then('o registro criado deve exibir todos os dados corretos', () => {
  cy.get('@record').then((record) => tables.assertRecord(record));
});
When('edito os dados do mesmo registro', () => {
  cy.get('@record').then((record) => {
    const updated = {
      ...record,
      firstName: 'Updated',
      lastName: 'Automation',
      age: record.age === '40' ? '41' : '40',
      salary: '30000',
      department: 'Updated QA',
    };
    cy.wrap(updated).as('updatedRecord');
    tables.edit(updated);
  });
});
Then('o mesmo registro deve exibir os dados atualizados', () => {
  cy.get('@updatedRecord').then((record) => tables.assertRecord(record));
});
When('excluo o mesmo registro', () => {
  cy.get('@record').then((record) => tables.delete(record.email));
});
Then('apenas os registros originais devem permanecer', () => {
  tables.search();
  cy.get('@originalRows').then((original) => {
    tables.snapshot().should('deep.equal', original);
  });
});
When('crio {int} registros aleatórios dinamicamente', (count) => {
  const records = Array.from({ length: count }, () => employee());
  cy.wrap(records).as('createdRecords');
  cy.wrap(records).each((record) => {
    tables.create(record);
    tables.assertRecord(record);
  });
});
Then('os {int} registros criados devem constar na tabela', (count) => {
  cy.get('@createdRecords')
    .should('have.length', count)
    .each((record) => tables.assertRecord(record));
  cy.get('@originalRows').then((original) => {
    tables.snapshot().should('have.length', original.length + count);
  });
});
When('excluo todos os registros criados', () => {
  cy.get('@createdRecords').then((records) => {
    cy.get('@originalRows').then((originalRows) => {
      tables.deleteCreated(records, originalRows);
    });
  });
});
