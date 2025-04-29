import puppeteer, { LocatorEvent } from 'puppeteer-core';

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

    const className = await page
        .locator('::-p-text(Get Started)')
        .map(button => button.className)
        .wait();
    console.log(`button className: ${className}`);

    await page
        .locator('::-p-text(Get Started)')
        .on(LocatorEvent.Action, () => {
            // Take a screenshot before clicking
            page.screenshot({ path: "before_click.png" });
        })
        .click();

    // Take a screenshot after clicking
    await page.screenshot({ path: "after_click.png" });

    // Close the browser
    await browser.close();
})();
