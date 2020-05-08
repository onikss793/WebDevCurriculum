const db = require('../database'),
	{ setUpData } = require('../utils'),
	app = require('../app'),
	request = require('supertest')(app).post('/api').set('Accept', 'application/json'),
	{ createTestClient } = require('apollo-server-testing'),
	{ gql } = require('apollo-server-express'),
	server = require('../graphql/server'),
	{ query, mutate } = createTestClient(server);

const loadDB = async () => {
	try {
		await db.authenticate().then().catch((err) => console.log('Test DB Error: ', err));
		await db.sync({ force: true });
		await setUpData();
	} catch (err) {
		console.log('load DB error: ', err);
	}
};

const tearDown = async () => {
	await db.close();
};

const getToken = async () => {
	const query = {
		query: `mutation {
						logIn(id: "철수", pw: "1") {
							success
							token
						}
					}`
	};

	const result = await request.send(query).then(res => res.toJSON());
	const response = JSON.parse(result.text).data;

	return response.logIn.token;
}

const loadNote = async () => {

}

module.exports = { loadDB, tearDown, request, getToken, gql, query, mutate };