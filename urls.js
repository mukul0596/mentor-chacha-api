const user = require('./apis/user');

const urls = (app) => {
    app.use('/api/user', user);
}

module.exports = urls;