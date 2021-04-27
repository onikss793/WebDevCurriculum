const path = require('path');

const capture = async (subject) => {
	await page.screenshot({
		path: path.join(__dirname, 'screenshot', `${ subject }.jpg`),
		fullPage: true,
		type: 'jpeg'
	});
};

module.exports = { capture };