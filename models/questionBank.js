const mongoose = require('mongoose');

const QuestionBankSchema = new mongoose.Schema({
    testId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['MCQ', 'MultipleMCQ', 'NumericalValue'],
        required: true
    },
    subject: {
        type: String,
        enum: ['Physics', 'Chemistry', 'Maths', 'Biology'],
        required: true
    },
    topic: {
        type: [String],
        required: true
    },
    marks:  {
        type: Number,
        validate: function(value) {
            value > 0
        },
        default: 1
    },
    negativeMarks: {
        type: Number,
        default: 0
    },
    partialMarking: {
        type: Boolean,
        default: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    options: [String],
    answer: {
        type: [Number],
        required: true
    }
});

const QuestionBank = mongoose.model('QuestionBank', QuestionBankSchema);

// const QuestionBank1 = new QuestionBank({
//     title: 'Advanced Problems in Mathematics',
//     description: 'Best QuestionBank for jEE Advanced. Best QuestionBank for jEE Advanced. Best QuestionBank for jEE Advanced. Best QuestionBank for jEE Advanced. Best QuestionBank for jEE Advanced. Best QuestionBank for jEE Advanced. Best QuestionBank for jEE Advanced. Best QuestionBank for jEE Advanced. Best QuestionBank for jEE Advanced. Best QuestionBank for jEE Advanced. Best QuestionBank for jEE Advanced. Best QuestionBank for jEE Advanced. Best QuestionBank for jEE Advanced.',
//     writter: 'Vikash Gupta and P. Joshi',
//     publication: 'Balajji',
//     subject: 'Maths',
//     for: 'Advanced',
//     imageUrl: 'irodov.png'
// });
// QuestionBank1.save();

module.exports = QuestionBank;