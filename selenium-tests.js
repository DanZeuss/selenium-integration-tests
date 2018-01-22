const {Builder, By, Key, until} = require('selenium-webdriver');
var webdriver = require('selenium-webdriver');
 
  (async function LogonTest() {
    let browser = new Builder()
      // defines the host of the current HUB
      .usingServer('http://192.168.1.6:4444/wd/hub')
      // the definition of the browser is done by running the scripts "run-test-*.sh" that loads/exports the variable that defines the 
      // current browser
      .forBrowser()
      .build();

    try {
      await browser.get('https://facebook.com');
      await browser.getTitle().then(title => {
        console.log(title);
      });

      await browser.findElement(By.id("email")).sendKeys("youremail");
      await browser.findElement(By.id("pass")).sendKeys("password");
      await browser.findElement(By.id("loginbutton")).click().then();
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
  })();