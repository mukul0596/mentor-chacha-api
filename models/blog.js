const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Blog = mongoose.model('Blog', BlogSchema);

// const Blog1 = new Blog({
//     title: 'Trying to create a Test Blog for testing purpose. And there you go.',
//     description: 'This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. This is a Test Blog. ',
// });
// Blog1.save();

module.exports = Blog;