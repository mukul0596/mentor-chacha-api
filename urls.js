const user = require('./apis/user');
const book = require('./apis/book');

const urls = (app) => {
    app.use('/api/user', user);
    app.use('/api/book', book);
}

module.exports = urls;