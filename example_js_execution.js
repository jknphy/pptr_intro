import puppeteer, { ElementHandle, JSHandle } from 'puppeteer-core';

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

    const a = 0;
    // Evaluate JavaScript
    const three = await page.evaluate(() => {
        // Error, no access to your script variables
        // return a + 1 + 2;
        return 1 + 2;
    });
    console.log(three);

    // Return types for non-primitive types
    // const body = await page.evaluate(() => {
    //     return document.body;
    // });
    // console.log(body); // {}, unexpected!

    const body = await page.evaluateHandle(() => {
        return document.body;
    });
    const dimensions = await body.evaluate(el => {
        return {
            // Total rendered width including padding and border
            offsetWidth: el.offsetWidth,
            // Total rendered height including padding and border 
            offsetHeight: el.offsetHeight
        };
    });
    console.log('--- Body Dimensions ---');
    console.log(`Width: ${dimensions.offsetWidth}px`);
    console.log(`Height: ${dimensions.offsetHeight}px`);

    console.log(body instanceof ElementHandle); // true
    console.log(body instanceof JSHandle); // true

    // Close the browser
    await browser.close();
})();
