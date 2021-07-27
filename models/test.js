const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    for: {
        type: String,
        required: true,
        enum: ['PCM', 'PCB'],
        default: 'PCM'
    },
    class: {
        type: Number,
        enum: [11, 12, 13],
        required: true
    },
    pattern: {
        type: String,
        required: true,
        enum: ['JEE Mains', 'JEE Advanced', 'NEET', 'Board']
    },
    subjects: {
        type: [String],
        required: true,
        enum: ['Physics', 'Chemistry', 'Maths', 'Biology'],
        default: ['Physics', 'Chemistry', 'Maths']
    },
    date: {
        type: Date,
        required: true
    },
    instituteId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Test = mongoose.model('Test', TestSchema);

// const Test1 = new Test({
//     title: 'Advanced Problems in Mathematics',
//     description: 'Best Test for jEE Advanced. Best Test for jEE Advanced. Best Test for jEE Advanced. Best Test for jEE Advanced. Best Test for jEE Advanced. Best Test for jEE Advanced. Best Test for jEE Advanced. Best Test for jEE Advanced. Best Test for jEE Advanced. Best Test for jEE Advanced. Best Test for jEE Advanced. Best Test for jEE Advanced. Best Test for jEE Advanced.',
//     writter: 'Vikash Gupta and P. Joshi',
//     publication: 'Balajji',
//     subject: 'Maths',
//     for: 'Advanced',
//     imageUrl: 'irodov.png'
// });
// Test1.save();

module.exports = Test;