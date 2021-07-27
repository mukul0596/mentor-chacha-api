const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    writter: {
        type: String,
        required: true
    },
    publication: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true,
        enum: ['Physics', 'Chemistry', 'Maths', 'Biology']
    },
    for: {
        type: String,
        required: true
    },
    image: String,
    description: String
});

const Book = mongoose.model('Book', BookSchema);

// const Book1 = new Book({
//     title: 'Advanced Problems in Mathematics',
//     description: 'Best book for jEE Advanced. Best book for jEE Advanced. Best book for jEE Advanced. Best book for jEE Advanced. Best book for jEE Advanced. Best book for jEE Advanced. Best book for jEE Advanced. Best book for jEE Advanced. Best book for jEE Advanced. Best book for jEE Advanced. Best book for jEE Advanced. Best book for jEE Advanced. Best book for jEE Advanced.',
//     writter: 'Vikash Gupta and P. Joshi',
//     publication: 'Balajji',
//     subject: 'Maths',
//     for: 'Advanced',
//     imageUrl: 'irodov.png'
// });
// Book1.save();

module.exports = Book;