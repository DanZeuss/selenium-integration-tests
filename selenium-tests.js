const {Builder, By, Key, until} = require('selenium-webdriver');
var webdriver = require('selenium-webdriver');
// var driver = new webdriver.Builder()
//   // defines the host of the current HUB
//   .usingServer('http://localhost:4444/wd/hub')
//   // the definition of the browser is done by running the scripts "run-test-*.sh" that loads/exports the variable that defines the 
//   // current browser
//   .forBrowser()
//   .build();
 
  (async function example() {
    let driver = new Builder()
      // defines the host of the current HUB
      .usingServer('http://localhost:4444/wd/hub')
      // the definition of the browser is done by running the scripts "run-test-*.sh" that loads/exports the variable that defines the 
      // current browser
      .forBrowser()
      .build();

    try {
      await driver.get('https://troy.zeuss.com/');
      await driver.getTitle().then(title => {
        console.log(title);
      });

      await driver.findElement(By.id("username")).sendKeys("zeuss_admin");
      await driver.findElement(By.id("password")).sendKeys("zeuss_admin");
      await driver.findElement(By.id("btn_signin")).click().then();
      await driver.takeScreenshot().then(
        function(image, err) {
            require('fs').writeFile('out.png', image, 'base64', function(err) {
                console.log(err);
            });
        }
    );
      // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    } finally {
      await driver.quit();
    }
  })();