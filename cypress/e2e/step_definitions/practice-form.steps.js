import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import form from '../../pages/PracticeFormPage';
import { student } from '../../support/dataFactory';

When(
  'preencho todos os campos do formulário com dados aleatórios válidos e um arquivo txt',
  () => {
    cy.fixture('locations').then((locations) => {
      const data = student(locations);
      cy.wrap(data).as('student');
      cy.log(`Dados sintéticos: ${JSON.stringify(data)}`);
      form.fill(data);
    });
  },
);
When('submeto o formulário', () => form.submit());
Then('o popup deve apresentar todos os dados enviados', () => {
  cy.get('@student').then((data) => form.assertSubmitted(data));
});
When('fecho o popup do formulário com a tecla Esc', () => form.closeModal());
Then('o formulário deve estar disponível novamente', () => {
  cy.get('#userForm').should('be.visible');
  cy.get('#firstName').should('be.visible').and('not.be.disabled');
});
