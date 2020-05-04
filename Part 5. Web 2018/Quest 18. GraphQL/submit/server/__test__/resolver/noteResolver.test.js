const setup = require('../setup'),
	noteMockUp = require('../../notes.json');

describe('Test noteResolver', () => {
	beforeAll(async () => {
		await setup.loadDB();
	});
	afterAll(async () => {
		await setup.tearDown();
	});

	it('should send { success: true } when createNote', async () => {
		const createNote = setup.gql`
            mutation createNote($title: String!, $body: String!) {
                createNote(title: $title, body: $body) {
                    success
                }
            }`;
		const result = await setup.mutate({ mutation: createNote, variables: { title: 'hello', body: 'world' } });

		expect(result.data.createNote.success).toBe(true);
	});

	it('should send Note when getNote', async () => {
		const getNote = setup.gql`
            query getNote($note_id: ID!) {
                getNote(note_id: $note_id) {
                    id
                    title
                    body
                    cursor_position
                    isSelected
                    user_id
                }
            }`;
		const result = await setup.query({ query: getNote, variables: { note_id: 1 } });
		const data = result.data.getNote;
		const { title, body, cursor_position, user_id } = noteMockUp[0];

		expect(data).toHaveProperty('id', '1');
		expect(data).toHaveProperty('title', title);
		expect(data).toHaveProperty('body', body);
		expect(data).toHaveProperty('cursor_position', cursor_position);
		expect(data).toHaveProperty('user_id', `${ user_id }`);
	});

	it('should send [Note] when getManyNotes', async () => {
		const getManyNotes = setup.gql`
            query getManyNotes {
                getManyNotes {
                    id
                    title
                }
            }`;
		const result = await setup.query({ query: getManyNotes });
		const data = result.data.getManyNotes;

		data.forEach(note => {
			expect(note).toHaveProperty('title');
		});
	});
});
