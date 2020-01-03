/**
 * This file contains the automated test for post question use case -see {@tutorial selenium-test}
 * @module automated-tests/test-js
 */
const { Builder, By} = require('selenium-webdriver');

/**
 * automated test for post question use case
 * @function 
 * @name automated-tests/postTest
 * @returns void
 * 
 */
async function postTest() {
    /**
     * @description driver for Google Chrome web browser
     * @member driver
     */
    let driver = await new Builder().forBrowser('chrome').build();
    /**
     * @member explanation
     * @description we make a get request into the react app, ajust the window, type a question into the textArea then post it and show questions
     */
        await driver.get('http://localhost:4000/');
        driver.manage().window().maximize();
        driver.findElement(By.name('question')).sendKeys("i'm making an automated test");
        driver.findElement(By.name('poster')).click();
        driver.findElement(By.name('questionbtn')).click();
        
}
postTest();