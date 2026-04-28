const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

describe('Login', () => {
    let driver;

    before(async () => {
    console.log('Memulai Test Suite Login');
  })

    beforeEach(async () => {
        const options = new chrome.Options();
        options.addArguments('--incognito');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        await driver.get('https://www.saucedemo.com/');
    })

    afterEach(async () => {
    console.log('Menutup browser');
    await driver.quit();
  })

    after(async () => {
    console.log('Test Suite Login Selesai');
  })


  it('login menggunakan standard_user', async () => {
    await driver.findElement(By.xpath("//input[@id='user-name']")).sendKeys('standard_user');
    await driver.findElement(By.xpath("//input[@id='password']")).sendKeys('secret_sauce');
    await driver.findElement(By.xpath("//input[@id='login-button']")).click();
    const currentUrl = await driver.getCurrentUrl();
    assert.strictEqual(currentUrl, 'https://www.saucedemo.com/inventory.html');
  });
 
  it('login menggunakan error_user', async () => {
    await driver.findElement(By.xpath("//input[@id='user-name']")).sendKeys('error_user');
    await driver.findElement(By.xpath("//input[@id='password']")).sendKeys('secret_sauce');
    await driver.findElement(By.xpath("//input[@id='login-button']")).click();
    const currentUrl = await driver.getCurrentUrl();
    assert.strictEqual(currentUrl, 'https://www.saucedemo.com/inventory.html');
  });
 

  it('login dengan username salah (typo: standard_use)', async () => {
    await driver.findElement(By.xpath("//input[@id='user-name']")).sendKeys('standard_use');
    await driver.findElement(By.xpath("//input[@id='password']")).sendKeys('secret_sauce');
    await driver.findElement(By.xpath("//input[@id='login-button']")).click();
    const errorMessage = await driver.findElement(By.xpath("//h3[@data-test='error']")).getText();
    assert.ok(errorMessage.includes('Username and password do not match'));
  });
 
  it('login dengan password salah (typo: secret_sauc)', async () => {
    await driver.findElement(By.xpath("//input[@id='user-name']")).sendKeys('error_user');
    await driver.findElement(By.xpath("//input[@id='password']")).sendKeys('secret_sauc');
    await driver.findElement(By.xpath("//input[@id='login-button']")).click();
    const errorMessage = await driver.findElement(By.xpath("//h3[@data-test='error']")).getText();
    assert.ok(errorMessage.includes('Username and password do not match'));
  });
});