import puppeteer from 'puppeteer-core';

(async () => {
    const browser = await puppeteer.connect({
        browserWSEndpoint: 'ws://127.0.0.1:9222/devtools/browser/570a755e-4c31-410d-8867-a2326432befa',
    });
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://developer.chrome.com/');

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    // Type into search box.
    await page.locator('.devsite-search-field').fill('automate beyond recorder');

    // Wait and click on first result.
    await page.locator('.devsite-result-item-link').click();

    // Locate the full title with a unique string.
    const textSelector = await page
        .locator('text/Customize and automate')
        .waitHandle();
    const fullTitle = await textSelector?.evaluate(el => el.textContent);

    // Print the full title.
    console.log('The title of this blog post is "%s".', fullTitle);

    // Disconnect the browser
    browser.disconnect();
})();
