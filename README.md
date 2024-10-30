# perplexity-cli

> Chat with [Perplexity AI](https://www.perplexity.ai/) in terminal

# Table of Contents

- [Dependency](#dependency)
- [Installation](#installation)
- [How to use](#how-to-use)
- [Want an alternative?](#want-an-alternative)
- [Note](#note)

## Dependency

- [playwright-chromium](https://github.com/Microsoft/playwright)
- [playwright-extra](https://github.com/berstend/puppeteer-extra/tree/master/packages/playwright-extra)
- [puppeteer-extra-plugin-stealth](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth#readme)

## Installation

```bash
npm i playwright-chromium playwright-extra puppeteer-extra-plugin-stealth
npx playwright install chromium
```

## How to use

- `perplexity.js` fetches result from `https://www.perplexity.ai/`:

```bash
$ ./perplexity.js "enter any text here"
```

- `perplexity-labs.js` fetches result from `https://labs.perplexity.ai/`:

```bash
$ ./perplexity-labs.js "enter any text here"
```

LLM `sonar-medium-online` is selected by default. Set the second argument as model name to select another model, for example: `./perplexity-labs.js "text" "codellama-70b-instruct"`.


## Note

This script is designed to handle only one question and one answer at a time. The response is provided in plain text format, making it well-suited for quick answer in the terminal. It is not designed for a polished conversational experience, but rather for efficient command line usage with Perplexity AI.
