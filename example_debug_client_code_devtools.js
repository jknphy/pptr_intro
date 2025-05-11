import puppeteer from 'puppeteer-core';

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        executablePath: "/usr/bin/chromium",
        devtools: true,
    });

    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://developer.chrome.com/');

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    await page.evaluate(() => {
        debugger;
    });

    // Close the browser
    await browser.close();
})();
