const {Builder, By, Key, until} = require('selenium-webdriver');
var webdriver = require('selenium-webdriver');
 var run = require('child_process');

  (async function LogonTest() {
    let browser = new Builder()
      // defines the host of the current HUB
      .usingServer('http://192.168.1.6:4444/wd/hub')
      // the definition of the browser is done by running the scripts "run-test-*.sh" that loads/exports the variable that defines the 
      // current browser
      .forBrowser()
      .build();

    try {
      await browser.get('https://troy.zeuss.com/');
      await browser.getTitle().then(title => {
        console.log(title);
      });

      await browser.findElement(By.id("username")).sendKeys("zeuss_admin");
      await browser.findElement(By.id("password")).sendKeys("zeuss_admin");
      await browser.findElement(By.id("btn_signin")).click().then();
      await browser.findElement(By.className("username")).getText().then((userLogged) => {
        console.info(userLogged.includes("Zeuss Admin"))
        console.info("exit -1");
      })
      await browser.takeScreenshot().then(
        function(image, err) {
            require('fs').writeFile('out.png', image, 'base64', function(err) {
                //console.log(image);
            });
        }
    );
    
    } finally {
      console.log
      await browser.quit();
    }
  })();