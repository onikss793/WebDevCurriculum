const noteDao = require('../../dao/noteDao'),
	setup = require('../setup');

describe('Note Dao Test', () => {
	beforeAll(async () => {
		await setup.loadDB();
	});
	afterAll(async () => {
		await setup.tearDown();
	});

	it('should create note', async () => {
		const data = {
			title: 'new note',
			body: 'body of the new note',
			cursor_position: 4,
			user_id: 1
		};
		await noteDao.createOrUpdate({ title: data.title }, data);
		const result = await noteDao.findNote(7, { title: data.title })
		                            .then(d => d && d.toJSON());

		expect(result).toEqual({ ...data, id: 7 });
	});

	it('should update note', async () => {
		const data = {
			id: 1,
			title: 'updated title',
			body: 'updated body',
			cursor_position: 10,
			user_id: 1
		};
		await noteDao.createOrUpdate({ id: data.id }, data);
		const result = await noteDao.findNote(1).then(d => d && d.toJSON());

		expect(result).toEqual(data);
	});
});