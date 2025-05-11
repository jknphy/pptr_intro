import puppeteer from 'puppeteer-core';

const url = 'https://developer.chrome.com/';
let page;

const firefoxBrowser = await puppeteer.launch({
    // WebDriver BiDi is used by default
    browser: 'firefox',
    executablePath: "/usr/bin/firefox",
    headless: false,
});
page = await firefoxBrowser.newPage();
await page.goto(url);
await firefoxBrowser.close();

const chromeBrowser = await puppeteer.launch({
    browser: 'chrome',
    // CDP would be used by default for Chrome
    protocol: 'webDriverBiDi',
    executablePath: "/usr/bin/chromium",
    headless: false,
});
page = await chromeBrowser.newPage();
await page.goto(url);
await chromeBrowser.close();
