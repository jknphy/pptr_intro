import puppeteer from 'puppeteer-core';

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        executablePath: "/usr/bin/chromium",
    });

    const page = await browser.newPage();

    const recorder = await page.screencast({ path: 'logs/recording.webm' });
    await page.tracing.start({ path: 'logs/trace.json', screenshots: true });

    // Navigate the page to a URL
    await page.evaluate(() => performance.mark('puppeteer:goto_start'));
    await page.goto('https://developer.chrome.com/');
    await page.evaluate(() => performance.mark('puppeteer:goto_end'));
    // await page.evaluate(() => performance.measure('puppeteer:goto_duration', 'goto_start', 'goto_end'));

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    // Type into search box.
    await page.evaluate(() => performance.mark('puppeteer:fill_search_start'));
    await page.locator('.devsite-search-field').fill('automate beyond recorder');
    await page.evaluate(() => performance.mark('puppeteer:fill_search_end'));

    // Wait and click on first result.
    // await page.evaluate(() => performance.mark('puppeteer:click_first_result_start'));
    await page.locator('.devsite-result-item-link').click();
    // await page.evaluate(() => performance.mark('puppeteer:click_first_result_end'));

    // Locate the full title with a unique string.
    const textSelector = await page
        .locator('text/Customize and automate')
        .waitHandle();
    const fullTitle = await textSelector?.evaluate(el => el.textContent);

    // Print the full title.
    console.log('The title of this blog post is "%s".', fullTitle);

    await page.tracing.stop();
    await recorder.stop();

    // Close the browser
    await browser.close();
})();
