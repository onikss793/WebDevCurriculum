const setup = require('../setup'),
	sessionDataDao = require('../../dao/sessionDataDao');

describe('Test sessionDataDao', () => {
	beforeAll(async () => {
		await setup.loadDB();
	});
	afterAll(async () => {
		await setup.tearDown();
	});

	it('should createOrUpdate userSession', async () => {
		const data = { user_id: 1, notes: "[{'title':'test','body':'test','isSelected':true,'cursor_position':14}]" };

		await sessionDataDao.createOrUpdate(data.user_id, data.notes);
		const result = await sessionDataDao.findUserSession(data.user_id).then(d => d && d.toJSON());

		expect(result).toHaveProperty('user_id', data.user_id);
		expect(result).toHaveProperty('notes', data.notes);
	})
})