const initModels = require('./initModel');
const models = initModels('Note', 'User', 'UserSession');
const { User, Note, UserSession } = models;

User.hasMany(Note);
Note.belongsTo(User, { through: 'user_id' });

User.hasMany(UserSession);
UserSession.belongsTo(User, { through: 'user_id' });

module.exports = { ...models };
