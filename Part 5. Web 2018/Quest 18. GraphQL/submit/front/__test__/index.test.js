const { capture } = require('./utils');

describe('Title test', () => {
	beforeAll(async () => {
		await page.goto(URL, { waitUntil: 'domcontentloaded' });
	});

	it('should to 메모장', async () => {
		const title = await page.title();

		expect(title).toEqual('메모장');
	});
});

describe('Login Test', () => {
	it('should login successfully', async () => {
		const loginInput = '.login-inputs input[type="text"]';
		const passwordInput = '.login-inputs input[type="password"]';
		const submit = '.positive';
		const logButton = '.ui.button:last-child';

		await capture('before-login');

		await page.type(loginInput, '철수');
		await page.type(passwordInput, '1');
		await page.click(submit);

		await capture('after-login');

		const logText = await page.$eval(logButton, el => el.innerText);

		expect(logText).toEqual('로그아웃');
	});
});

describe('New File Test', () => {
	beforeAll(async () => {
		await page.goto(URL, { waitUntil: 'domcontentloaded' });
	});

	it('should make new file', async () => {
		await page.click('.ui.button:first-child');
		await page.waitForSelector('textarea.pad');

		const title = await page.$eval('label.active input', el => el.tagName);
		const body = await page.$eval('textarea.pad', el => el.tagName);

		await capture('make-new-file');

		expect(title).toEqual('INPUT');
		expect(body).toEqual('TEXTAREA');
	});
});

describe('Save File Test', () => {
	it('should save file', async () => {
		await page.type('label.active input', 'TITLE');
		await page.type('textarea.pad', 'BODY');

		await page.click('.ui.button:nth-child(2)');

		let message = '';
		await page.on('dialog', async alert => {
			message = await alert.message();
			await alert.dismiss();
		});
		await capture('save-file');

		expect(message).toEqual('성공적으로 저장했습니다!');
	});
});

describe('Close File Test', () => {
	it('should close file', async () => {
		await page.waitForSelector('#tab > label > button');
		await page.click('#tab > label > button');

		const title = await page.evaluate(() => document.querySelector('#tab > label > input'));
		const body = await page.evaluate(() => document.querySelector('#board > textarea'));

		await capture('file-canceled');

		expect(title).toBeFalsy();
		expect(body).toBeFalsy();
	});
});

describe('Load File Test', () => {
	it('should popup modal', async () => {
		await page.click('.ui.button:nth-child(3)');

		await capture('load-modal');
		const header = await page.$eval('#modal > div.header', el => el.innerText);

		expect(header).toEqual('불러올 노트');
	});

	it('should load saved file', async () => {
		await page.click('#list > div');

		await page.waitForSelector('#tab > label > input');
		await page.waitForSelector('#board > textarea');

		const title = await page.$eval('#tab > label > input', el => el.value);
		const body = await page.$eval('#board > textarea', el => el.value);

		await capture('file-loaded');
		expect(title).toEqual('TITLE');
		expect(body).toEqual('BODY');
	});
});

describe('Log out Test', () => {
	it('should log out', async () => {
		await page.click('.ui.button:last-child');
		await page.waitForSelector('#modal > div.header');

		const header = await page.$eval('#modal > div.header', el => el.innerHTML);

		await capture('after-logout');

		expect(header).toEqual(' 로그인 ');
	});
});

describe('Session Data Load Test', () => {
	it('should load last working history', async () => {
		// Log In First
		const loginInput = '#modal > div.login-inputs > input[type=text]:nth-child(1)';
		const passwordInput = '#modal > div.login-inputs > input[type=password]:nth-child(2)';
		const submit = '.positive';

		await page.type(loginInput, '철수');
		await page.type(passwordInput, '1');
		await page.click(submit);

		// Check Working History
		await page.waitForSelector('#tab > label > input');
		await page.waitForSelector('#board > textarea');

		const title = await page.$eval('#tab > label > input', el => el.value);
		const body = await page.$eval('#board > textarea', el => el.value);

		await capture('session-loaded');
		expect(title).toEqual('TITLE');
		expect(body).toEqual('BODY');
	});
});