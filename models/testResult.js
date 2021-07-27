const mongoose = require('mongoose');

const SubjectStatsSchema = new mongoose.Schema({
    subject: String,
    marks: Number,
    totalMarks: Number,
    negativeMarks: Number,
    attempted: Number,
    unattempted: Number,
    correct: Number,
    incorrect: Number,
    totalQuestions: Number,
    accuracy: Number,
    average: Number,
    highestMarks: Number
});

const TestResultSchema = new mongoose.Schema({
    testId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true    
    },
    marks: {
        type: Number,
        required: true
    },
    totalMarks: {
        type: Number,
        required: true
    },
    negativeMarks: {
        type: Number,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    },
    rank: {
        type: Number,
        required: true
    },
    totalStudents: {
        type: Number,
        required: true
    },
    attempted: {
        type: Number,
        required: true
    },
    unattempted: {
        type: Number,
        required: true
    },
    correct: {
        type: Number,
        required: true
    },
    incorrect: {
        type: Number,
        required: true
    },
    totalQuestions: {
        type: Number,
        required: true
    },
    accuracy: {
        type: Number,
        required: true
    },
    average: {
        type: Number,
        required: true
    },
    highestMarks: {
        type: Number,
        required: true
    },
    subjectStats: {
        type: [SubjectStatsSchema],
        required: true
    }
}, { timestamps: true });

const TestResult = mongoose.model('TestResult', TestResultSchema);

// const TestResult1 = new TestResult({
//     title: 'Advanced Problems in Mathematics',
//     description: 'Best TestResult for jEE Advanced. Best TestResult for jEE Advanced. Best TestResult for jEE Advanced. Best TestResult for jEE Advanced. Best TestResult for jEE Advanced. Best TestResult for jEE Advanced. Best TestResult for jEE Advanced. Best TestResult for jEE Advanced. Best TestResult for jEE Advanced. Best TestResult for jEE Advanced. Best TestResult for jEE Advanced. Best TestResult for jEE Advanced. Best TestResult for jEE Advanced.',
//     writter: 'Vikash Gupta and P. Joshi',
//     publication: 'Balajji',
//     subject: 'Maths',
//     for: 'Advanced',
//     imageUrl: 'irodov.png'
// });
// TestResult1.save();

module.exports = TestResult;