import { Given, When } from '@badeball/cypress-cucumber-preprocessor';
import navigation from '../../pages/NavigationPage';

Given('que estou na página inicial do DemoQA', () => navigation.openHome());
When('navego pela categoria {string} e submenu {string}', (category, submenu) =>
  navigation.openMenu(category, submenu),
);
