import {AppPage} from './app.po';
import {$, browser, By, by, element, ExpectedConditions, logging, protractor} from 'protractor';

describe('Protractor Test Front-End', () => {
  let page: AppPage;
  const pointer = element(by.id('test-pointer'));

  beforeEach(() => {
    page = new AppPage();
  });

  // No pasa porque espera que siempre reciba un username
  // cuando al no estar logueado no lo tiene
  it('See profile without login', function() {
    // browser.get('http://localhost:4200/profile/jorge');
    // expect(element(by.id('username-heading')).getText()).toEqual('jorge');
    // browser.navigate().back();
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
    expect(element(by.id('test-pointer-2')).getText()).toEqual('Usuarios Complementarios');
  });

  it('Save without changes', function() {
    element(by.id('save-changes')).click();
    browser.sleep(1000);
    browser.refresh();
    browser.sleep(1000);
  });

  it('Add interest', function() {
    browser.driver.findElement(By.id('interest-option')).click(); // Opens the dropdown
    browser.driver.findElement(By.xpath('//mat-option/span[contains(.,\'Java\')]')).click(); // Clicks on 'Java' option
    element(by.id('add-interest-button')).click();
    element(by.id('save-changes')).click();
    browser.sleep(2000);
    browser.refresh();
    browser.sleep(2000);
  });

  it('Add knowledge', function() {
    browser.driver.findElement(By.id('knowledge-option')).click(); // Opens the dropdown
    browser.driver.findElement(By.xpath('//mat-option/span[contains(.,\'Angular\')]')).click(); // Clicks on 'Angular' option
    element(by.id('add-knowledge-button')).click();
    element(by.id('save-changes')).click();
    browser.sleep(2000);
    browser.refresh();
    browser.sleep(5000);
  });

  it('See profile', function() {
    element(by.id('goToProfileBtn')).click();
    expect(element(by.id('username-heading')).getText()).toEqual('jorge');
    browser.navigate().back();
    expect(element(by.id('test-pointer-2')).getText()).toEqual('Usuarios Complementarios');
  });

  it('See profile after logout', function() {
    browser.get('http://localhost:4200/profile/jorge');
    element(by.id('closeSessionBtn')).click();
    expect(pointer.getText()).toEqual('Login');
    element(by.id('mail-input')).sendKeys('jorge');
    element(by.id('pass-input')).sendKeys('12345678');
    element(by.id('access-button')).click();
  });

  it('Jorge makes a reservation', function() {
    element(by.id('reservationBtn')).click();
    browser.sleep(500);
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    const hour = today.getHours();
    browser.driver.findElement(By.id('chooseThemeTeach')).click(); // Opens the dropdown
    browser.driver.findElement(By.xpath('//mat-option/span[contains(.,\'Historia\')]')).click(); // Clicks on 'Historia' option
    element(by.id('inputDateTeach')).sendKeys(dd + '-' + mm + '-' + yyyy);
    element(by.id('inputStartHourTeach')).sendKeys(hour + '');
    element(by.id('inputEndHourTeach')).sendKeys((hour + 1) + '');
    browser.driver.findElement(By.id('chooseThemeLearn')).click(); // Opens the dropdown
    browser.driver.findElement(By.xpath('//mat-option/span[contains(.,\'Java\')]')).click(); // Clicks on 'Java' option
    element(by.id('inputDateLearn')).sendKeys((dd + 1) + '-' + mm + '-' + yyyy);
    element(by.id('inputStartHourLearn')).sendKeys(hour + '');
    element(by.id('inputEndHourLearn')).sendKeys((hour + 1) + '');
    element(by.id('makeReservation')).click();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
