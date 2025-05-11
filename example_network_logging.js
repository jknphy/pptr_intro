import puppeteer, { ElementHandle, JSHandle } from 'puppeteer-core';

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 300,
        executablePath: "/usr/bin/chromium",
    });

    const page = await browser.newPage();

    // page.on('request', request => {
    //     console.log('--- Request ---');
    //     console.log(`URL: ${request.url()}`);
    //     console.log(`Method: ${request.method()}`);
    //     console.log(`Resource Type: ${request.resourceType()}`);
    //     console.log(`Is Navigation Request: ${request.isNavigationRequest()}`);
    // });

    // page.on('response', async response => {
    //     console.log('--- Response ---');
    //     console.log(`URL: ${response.url()}`);
    //     console.log(`Status: ${response.status()} ${response.statusText()}`);
    //     console.log(`From Cache: ${response.fromCache()}`);
    // });

    // Page Lifecycle Events (related to network completion)
    page.on('load', () => {
        console.log('\n--- Page Load Event ---');
        console.log('Page and all its resources (images, CSS, etc.) have fully loaded.');
    });

    page.on('domcontentloaded', () => {
        console.log('\n--- DOMContentLoaded Event ---');
        console.log('HTML document and initial scripts loaded and parsed.');
    });

    // Navigate the page to a URL
    await page.goto('https://developer.chrome.com/', { waitUntil: 'networkidle0' });

    // Close the browser
    // await browser.close();
})();
