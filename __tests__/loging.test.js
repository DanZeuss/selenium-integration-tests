jest.setTimeout(100000000);
test('Testing logon on Troy', async () => {

    const {Builder, By, Key, until} = require('selenium-webdriver');
    var webdriver = require('selenium-webdriver');
    let browser = new Builder()
        // defines the host of the current HUB
        .usingServer('http://192.168.1.6:4444/wd/hub')
        // the definition of the browser is done by running the scripts "run-test-*.sh" that loads/exports the variable that defines the 
        // current browser
        .forBrowser()
        .build();
    try {
        await browser.get('https://troy.zeuss.com');

        await browser.findElement(By.id("username")).sendKeys(process.env.ZEUSS_USER_NAME);
        await browser.findElement(By.id("password")).sendKeys(process.env.ZEUSS_USER_PWD);
        await browser.findElement(By.id("btn_signin")).click().then();
        
        var userName = await browser.findElement(By.className("username")).getText();
        expect.assertions(1);
        expect(userName).toContain("Zeuss Admin");

        await browser.takeScreenshot().then(
            function(image, err) {
                require('fs').writeFile('out.png', image, 'base64', function(err) {
                    //console.log(image);
                });
            }
        );
    
    } finally {
      await browser.quit();
    }    
});