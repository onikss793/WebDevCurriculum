const setup = require('../setup');

describe('Test authResolver', () => {
	beforeAll(async () => {
		await setup.loadDB();
	});

	afterAll(async () => {
		await setup.tearDown();
	})

	it('should send 200, success, token when login', async () => {
		const query = {
			query: `mutation {
						logIn(id: "철수", pw: "1") {
							success
							token
						}
					}`
		};
		const result = await setup.request.send(query).then(res => res.toJSON());
		const response = JSON.parse(result.text).data;

		expect(result.status).toEqual(200);
		expect(response.logIn).toHaveProperty('success', true);
		expect(response.logIn).toHaveProperty('token');
	});
});
