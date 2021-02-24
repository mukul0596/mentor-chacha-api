const admin = require('./apis/admin/admin');
const institute = require('./apis/admin/institute');
const adminBook = require('./apis/admin/book');
const adminBlog = require('./apis/admin/blog');
const adminNotification = require('./apis/admin/notification');
const user = require('./apis/user');
const book = require('./apis/book');
const blog = require('./apis/blog');
const notification = require('./apis/notification');

const urls = (app) => {
    app.use('/api/admin', admin);
    app.use('/api/admin/institute', institute);
    app.use('/api/admin/book', adminBook);
    app.use('/api/admin/blog', adminBlog);
    app.use('/api/admin/notification', adminNotification);
    app.use('/api/user', user);
    app.use('/api/book', book);
    app.use('/api/blog', blog);
    app.use('/api/notification', notification);
}

module.exports = urls;