#!/usr/bin/env node

const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);

const url = 'https://www.perplexity.ai/search?focus=internet&copilot=false&q=' + process.argv[2];
const buttonCopy = 'svg[data-icon="clipboard"]'; // copy icon on answer 
const buttonMenu = 'button[data-testid="thread-dropdown-menu"]'; // "..." icon on top right
const buttonDelete = 'div[data-testid="thread-delete"]'; // "Delete Thread" button
const buttonConfirm = 'css=button:has-text("Confirm")'; 
const textMessage = 'div[dir="auto"]';
const totalLoopCount = 60;
const printIntervalTime = 500;

chromium.launch({ headless: true, timeout: 30000 }).then(async browser => {
  // start session
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // get answer 
  for (let i = 0; i < totalLoopCount; i++) {
    await new Promise((resolve) => setTimeout(resolve, printIntervalTime));
    const result = await page.locator(textMessage).textContent();
    console.clear();
    console.log('----------\n' + result);
    if (await page.locator(buttonCopy).isVisible()
      && i != (totalLoopCount - 1)){
      i = (totalLoopCount - 1);
    }
  }

  // delete thread
  await page.click(buttonMenu, {focus: true});
  await page.waitForTimeout(300);
  await page.click(buttonDelete);
  await page.waitForTimeout(300);
  await page.click(buttonConfirm);

  // close browser
  await browser.close();
});
