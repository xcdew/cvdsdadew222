const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const pages = await browser.pages();
    const page = pages[0]; // Get the first page, which is the current tab
    await page.goto('https://www.betpawa.com.gh/login?returnPath=%2Fgames&gameId=aviator&filter=all');

    await page.waitForSelector('#login-form-phoneNumber');
    await page.type('#login-form-phoneNumber', '575000356');
    await page.type('#login-form-password-input', 'rpZCmN$vK3qh4');
    await page.click('[data-test-id="logInButton"]');

    await page.waitForSelector('.messages-container.scroll-y');

    await page.evaluate(() => {
        function main() {
            var button = document.querySelector('.btn-claim');
            if (button) {
                button.click();
            }
        }

        setInterval(main, 5);
    });

    var n = 0;

    function read() {
        console.log(`Puppeteer has been running for ${n}s`)
        n = n + 1;
    }

    setInterval(read, 1000);

    // Print the full title
    const logStatement = `Running...`;
    console.log(logStatement);
    res.send(logStatement);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
