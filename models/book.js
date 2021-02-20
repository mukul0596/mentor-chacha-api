const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    subject: {
        type: String,
        required: true
    },
    for: String,
    imageUrl: String
});

const Book = mongoose.model('Book', BookSchema);

// const Book1 = new Book({
//     title: 'IE Irodov',
//     description: 'Best book for jEE Advanced',
//     subject: 'Physics',
//     for: 'Advanced',
//     imageUrl: 'irodov.png'
// });
// Book1.save();

module.exports = Book;