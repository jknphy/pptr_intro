import puppeteer from 'puppeteer-core';

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: "/usr/bin/chromium",
    });

    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://developer.chrome.com/');

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    // Scroll 1000 pixels
    await page.mouse.wheel({ deltaY: 1000 });

    // Take a screenshot
    await page.screenshot({ path: "logs/mouse1.png" });

    // Small delay to see it in headful mode
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Scroll 1000 pixels
    await page.mouse.wheel({ deltaY: 1000, });

    // Take a screenshot
    await page.screenshot({ path: "logs/mouse2.png" });

    // Small delay to see it in headful mode
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Close the browser
    await browser.close();
})();
