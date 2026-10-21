import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import sortable from '../../pages/SortablePage';

When('altero a ordem inicial da lista por drag and drop', () =>
  sortable.scramble(),
);
When('ordeno os seis itens por drag and drop', () => {
  cy.fixture('sortable').then(({ order }) => sortable.sort(order));
});
Then('a ordem final deve ser One, Two, Three, Four, Five, Six', () => {
  cy.fixture('sortable').then(({ order }) => sortable.assertOrder(order));
});
