module.exports = error => {
	console.log(error.extensions.exception.stacktrace.join('\n'));
	if (process.env.NODE_ENV === 'test') console.log(error);
	return {
		message: error.message
	}
}