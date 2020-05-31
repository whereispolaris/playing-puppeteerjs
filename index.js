const puppeteer = require('puppeteer');

async function getItems() {
	// Launches browser
	const browser = await puppeteer.launch({
		// Show Chromium browser
		headless: false,
		// fix viewport bug
		defaultViewport: null,
	});

	// Opens new tab
	const page = await browser.newPage();

	// Store URL in a variable
	const url = 'https://austin.craigslist.org/search/sss?query=ps4&sort=rel';

	await page.goto(url);

	// Wait for elements with class "result-row" to appear on page
	await page.waitFor('.result-row');

	// Target "result-row" and pass a fuction ($$eval)
	const results = await page.$$eval('.result-row', (rows) => {
		// Map results to new object: properties
		return rows.map((row) => {
			// Create properties object
			const properties = {};
			const titleElement = row.querySelector('.result-title');
			properties.title = titleElement.innerText;
			properties.url = titleElement.getAttribute('href');
			const priceElement = row.querySelector('.result-price');
			properties.price = priceElement ? priceElement.innerText : '';
			const imageElement = row.querySelector('.swipe [data-index="0"] img');
			properties.imageURL = imageElement ? imageElement.src : '';
			return properties;
		});
	});

	console.log(results);

	browser.close();
}

getItems();
