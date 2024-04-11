const puppeteer = require("puppeteer");
require("dotenv").config();

const fs = require('fs');

// Directory path
const directoryPath = './';

// Read the contents of the directory
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Filter out directories
  const directories = files.filter(file => fs.statSync(file).isDirectory());

  // Output the list of directories
  console.log('Directories:', directories);
});


const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
      `--disable-extensions-except=${"/usr/src/app/extension"}`, 
      `--load-extension=${"/usr/src/app/extension"}`,
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const pages = await browser.pages();
    const page = pages[0]; // Get the first page, which is the current tab

    await page.goto('https://www.sportybet.com/gh/m/games/sportygames?game=turbo-games/aviator');

    await page.waitForSelector('input[type="tel"]');
    await page.type('input[type="tel"]', '572028292');
    await page.type('input[type="password"]', 'OiTube342@$');

    await page.click('.login-btn');

    function delay(time) {
      return new Promise(function(resolve) {
        setTimeout(resolve, time)
      });
    }

    await delay(10000);

    seconds = 0;

    function timer() {
      seconds++;
      console.log(`Running for ${seconds} s`);
    }

    setInterval(timer, 1000);

    
    const logStatement = `Running...`;
    console.log(logStatement);
    res.send(logStatement);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  }
};

module.exports = { scrapeLogic };
