import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import progress from '../../pages/ProgressBarPage';

When('inicio e paro a barra antes de 25 por cento', () =>
  progress.startAndPause(),
);
Then('o valor deve ser menor ou igual a 25 por cento e permanecer parado', () =>
  progress.assertPaused(),
);
When('retomo a barra até 100 por cento', () => progress.complete());
When('reseto a barra de progresso', () => progress.reset());
Then('a barra deve voltar a zero', () => {
  cy.get('[role="progressbar"]').should('have.attr', 'aria-valuenow', '0');
});
