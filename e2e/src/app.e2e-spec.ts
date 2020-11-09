import { AppPage } from './app.po';
import {browser, by, element, logging} from 'protractor';

describe('Protractor Test Front-End', () => {
  let page: AppPage;
  const pointer = element(by.id('test-pointer'));

  beforeEach(() => {
    page = new AppPage();
  });

  it('Load the page', function() {
    // browser.get('https://learn-and-trade.herokuapp.com');
    browser.get('http://localhost:4200/login');
    const title = browser.getTitle();
    expect(title).toEqual('LearnTrade');
  });


  it('Check login page', function() {
    expect(pointer.getText()).toEqual('Login');
  });

  it('Log in with user', function() {
    element(by.id('mail-input')).sendKeys('jorge');
    element(by.id('pass-input')).sendKeys('12345678');
    element(by.id('access-button')).click();
    expect(pointer.getText()).toEqual('Mi Perfil');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
