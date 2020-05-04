const setup = require('../setup');

describe('Test sessionResolver', () => {
	beforeAll(async () => {
		await setup.loadDB();
	});
	afterAll(async () => {
		await setup.tearDown();
	});

	it('should send { success: true } when uploadSessionData', async () => {
		const uploadSessionData = setup.gql`
            mutation uploadSessionData($notes: String!) {
                uploadSessionData(notes: $notes) {
                    success
                }
            }`;
		const notes = '[{\'title\':\'asdfasdf\',\'body\':\'asdfasdfasdfas\',\'isSelected\':true,\'cursor_position\':14}]';
		const result = await setup.mutate({ query: uploadSessionData, variables: { notes } });
		const data = result.data.uploadSessionData;

		expect(data).toHaveProperty('success', true);
	});

	it('should send notes when loadSessionData', async () => {
		const loadSessionData = setup.gql`
            query loadSessionData {
                loadSessionData {
                    user_id
                    notes {
                        id
                        title
                        body
                        cursor_position
                        isSelected
                    }
                }
            }`;
		const result = await setup.query({ query: loadSessionData });
		const data = result.data.loadSessionData;
		const notes = [{ id: null, 'title': 'asdfasdf', 'body': 'asdfasdfasdfas', 'isSelected': true, 'cursor_position': 14 }];

		expect(data).toHaveProperty('user_id', '1');
		expect(data).toHaveProperty('notes', notes);
	});
});