#!/usr/bin/env node

const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);

const url = 'https://labs.perplexity.ai/';
const searchText = process.argv[2];
const llm = (process.argv[3] === undefined) ? 'llama-3-sonar-large-32k-online' : process.argv[3];
const selectList = '#lamma-select';
const textArea = 'textarea[placeholder="Ask anything..."]';
const buttonAskPerplexity = '.umami--click--ask_perplexity_redirect';
const textMessage = '.prose';
const totalLoopCount = 60;
const printIntervalTime = 500;

chromium.launch({ headless: true, timeout: 30000 }).then(async browser => {
  // start session
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // select LLMs
  await page.waitForSelector(textArea);
  await page.locator(selectList).selectOption({value: llm});

  // submit question
  await page.locator('textarea').first().fill(searchText);
  await page.locator('button').last().click();

  // get answer
  for (let i = 0; i < totalLoopCount; i++) {
    await new Promise((resolve) => setTimeout(resolve, printIntervalTime));
    const result = await page.locator(textMessage).last().textContent();
    console.clear();
    console.log('----------\n' + result);
    if (await page.locator(buttonAskPerplexity).isVisible()
      && i != (totalLoopCount - 1)){
      i = (totalLoopCount - 1);
    }
  }

  // close browser
  await browser.close();
});
