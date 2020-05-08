const setup = require('../setup'),
	userDao = require('../../dao/userDao');

describe('Test userDao', () => {
	beforeAll(async () => {
		await setup.loadDB();
	});
	afterAll(async () => {
		await setup.tearDown();
	});

	it('should create user', async () => {
		const data = { username: 'test', password: 'test' };
		const result = await userDao.insertUser(data);

		expect(result).toHaveProperty('username', data.username);
		expect(result).toHaveProperty('password', data.password);
	});

	it('should find user by pk', async () => {
		const id = 4;
		const result = await userDao.findUserByPk(id, ['username', 'id']);

		expect(result).toHaveProperty('username', 'test');
		expect(result).toHaveProperty('id', 4);
	})
});