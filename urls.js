const admin = require('./apis/admin/admin');
const institute = require('./apis/admin/institute');
const adminBook = require('./apis/admin/book');
const adminBlog = require('./apis/admin/blog');
const topic = require('./apis/admin/topic');
const student = require('./apis/admin/student');
const adminNotification = require('./apis/admin/notification');
const adminTest = require('./apis/admin/test');
const adminTestPaper = require('./apis/admin/testPaper');
const adminTestResponse = require('./apis/admin/testResponse');
const adminTestResult = require('./apis/admin/testResult');
const user = require('./apis/user');
const book = require('./apis/book');
const blog = require('./apis/blog');
const notification = require('./apis/notification');
const test = require('./apis/test');
const testResult = require('./apis/testResult');
const questionBank = require('./apis/questionBank');

const urls = (app) => {
    app.use('/api/admin', admin);
    app.use('/api/admin/institute', institute);
    app.use('/api/admin/book', adminBook);
    app.use('/api/admin/blog', adminBlog);
    app.use('/api/admin/topic', topic);
    app.use('/api/admin/student', student);
    app.use('/api/admin/notification', adminNotification);
    app.use('/api/admin/test', adminTest);
    app.use('/api/admin/testPaper', adminTestPaper);
    app.use('/api/admin/testResponse', adminTestResponse);
    app.use('/api/admin/testResult', adminTestResult);
    app.use('/api/user', user);
    app.use('/api/book', book);
    app.use('/api/blog', blog);
    app.use('/api/notification', notification);
    app.use('/api/test', test);
    app.use('/api/testResult', testResult);
    app.use('/api/questionBank', questionBank);
}

module.exports = urls;