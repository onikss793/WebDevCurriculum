const app = require('./app'),
	db = require('./database');

const { setUpData } = require('./utils');

db.authenticate()
  .then(() => console.log('Database Connected'))
  .catch((err) => console.log('Database Connection Error: ', err));
db.sync({ force: true }).then(() => {
	setUpData()
		.then(() => console.log('Mock Up Success'))
		.catch((err) => console.log('Mock Up Error: ', err));
});

app.listen(8000, () => console.log('Server Listening to: ', 8000));