import puppeteer from 'puppeteer-core';

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        executablePath: "/usr/bin/chromium",
    });
    const page = await browser.newPage();
    await page.goto('https://developer.chrome.com/');
    await page.pdf({
        path: 'logs/dc.pdf',
    });
    await page.pdf({
        pageRanges: '1-3',
        path: 'logs/dc_1_3.pdf',
    });
    await browser.close();
})();
