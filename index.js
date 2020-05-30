const puppeteer = require('puppeteer');

async function getItems() {
	// Launches browser
	const browser = await puppeteer.launch({
		headless: false,
		// fix viewport bug
		defaultViewport: null,
	});

	// Opens new tab
	const page = await browser.newPage();

	// Store URL in a variable
	const url = 'https://austin.craigslist.org/search/sss?query=ps4&sort=rel';

	await page.goto(url);
}

getItems();
