import puppeteer from 'puppeteer-core';

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        executablePath: "/usr/bin/chromium",
    });

    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://developer.chrome.com/');

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    // listen (page.on) for the console event which returns
    // a payload with the logged tex
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    await page.evaluate(() => console.log(`url is ${location.href}`));

    // Close the browser
    await browser.close();
})();
