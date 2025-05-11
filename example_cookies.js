import puppeteer from 'puppeteer-core';

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        executablePath: "/usr/bin/chromium",
    });
    const page = await browser.newPage();
    await page.goto('https://developer.chrome.com/');

    // Set a cookie using script evaluation
    await page.evaluate(() => {
        document.cookie = 'myCookie = MyCookieValue';
    });
    // Set a cookie directly into the browser's storage
    await browser.setCookie(
        {
            name: 'cookie1',
            value: '1',
            domain: 'localhost',
            path: '/',
            sameParty: false,
            expires: -1,
            httpOnly: false,
            secure: false,
            sourceScheme: 'NonSecure',
        }
    );
    // Deletes a cookie
    await browser.deleteCookie(
        {
            // Minimum properties to identify unique key
            name: 'cookie1',
            value: '1',
            domain: 'localhost',

        });
    // Print available cookies
    console.log(await browser.cookies());
    await browser.close();
})();
