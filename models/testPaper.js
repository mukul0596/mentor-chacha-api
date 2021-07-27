const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
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

const TestPaperSchema = new mongoose.Schema({
    testId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    questions: {
        type: [QuestionSchema],
        required: true
    },
    remarks: {
        type: String,
        default: ''
    }
});

const TestPaper = mongoose.model('TestPaper', TestPaperSchema);

// const TestPaper1 = new TestPaper({
//     title: 'Advanced Problems in Mathematics',
//     description: 'Best TestPaper for jEE Advanced. Best TestPaper for jEE Advanced. Best TestPaper for jEE Advanced. Best TestPaper for jEE Advanced. Best TestPaper for jEE Advanced. Best TestPaper for jEE Advanced. Best TestPaper for jEE Advanced. Best TestPaper for jEE Advanced. Best TestPaper for jEE Advanced. Best TestPaper for jEE Advanced. Best TestPaper for jEE Advanced. Best TestPaper for jEE Advanced. Best TestPaper for jEE Advanced.',
//     writter: 'Vikash Gupta and P. Joshi',
//     publication: 'Balajji',
//     subject: 'Maths',
//     for: 'Advanced',
//     imageUrl: 'irodov.png'
// });
// TestPaper1.save();

module.exports = TestPaper;