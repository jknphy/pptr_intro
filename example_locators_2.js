import puppeteer from 'puppeteer-core';

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        // headless: false,
        // slowMo: 300,
        executablePath: "/usr/bin/chromium",
    });

    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://developer.chrome.com/');

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    // const button = await page.waitForSelector('::-p-text(Get Started)');
    // await button.click();
    // await button.dispose();

    // Returns all elements matching a selector.
    const buttons = await page.$$('.button:not(.button-primary)');
    for (const button of buttons) {
        console.log(await button.evaluate(el => el.textContent));
        button.dispose();
    }

    // Returns a single element matching a selector.
    const button = await page.$('::-p-text(Get Started)');
    await button.click();
    await button.dispose();

    // Close the browser
    await browser.close();
})();
