import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import windows from '../../pages/BrowserWindowsPage';

When('clico em New Window', () => windows.openNewWindow());
Then('uma nova janela real deve exibir a página de exemplo e ser fechada', () =>
  windows.assertRealWindowAndClose(),
);
