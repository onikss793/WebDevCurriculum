const { ApolloServer } = require('apollo-server-express');

module.exports =  new ApolloServer({
	typeDefs: require('../schema'),
	resolvers: require('../resolvers'),
	context: require('./context'),
	formatError: require('./formatError')
});