module.exports = error => {
	console.log(error.extensions.exception.stacktrace.join('\n'));

	return {
		message: error.message
	}
}