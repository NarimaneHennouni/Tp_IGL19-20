const { Builder, By, Key, until} = require('selenium-webdriver');

async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://localhost:4000/');
        driver.manage().window().maximize();
        driver.findElement(By.name('question')).sendKeys("i'm making an automated test");
        driver.findElement(By.name('poster')).click();
        driver.findElement(By.name('questionbtn')).click();
        
}
example();