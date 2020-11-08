import { AppPage } from './app.po';
import {browser, by, element, logging} from 'protractor';

describe('Protractor Test Front-End', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Load the page', () => {
    browser.get('https://learn-and-trade.herokuapp.com');

    expect(element(by.id('loginTitle')).getText).toEqual('Login');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
