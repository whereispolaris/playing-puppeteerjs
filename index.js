const puppeteer = require('puppeteer');

async function getItems() {
	// Launches browser
	const browser = await puppeteer.launch({
		headless: false,
		// fix viewport bug
		defaultViewport: null,
	});
}

getItems();
