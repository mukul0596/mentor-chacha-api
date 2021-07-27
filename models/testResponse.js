const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    answer: {
        type: [Number],
        required: true
    },
    score: Number
});

const TestResponseSchema = new mongoose.Schema({
    testId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true    
    },
    response: {
        type: [ResponseSchema],
        required: true
    },
    remarks: {
        type: String,
        default: ''
    }
});

const TestResponse = mongoose.model('TestResponse', TestResponseSchema);

// const TestResponse1 = new TestResponse({
//     title: 'Advanced Problems in Mathematics',
//     description: 'Best TestResponse for jEE Advanced. Best TestResponse for jEE Advanced. Best TestResponse for jEE Advanced. Best TestResponse for jEE Advanced. Best TestResponse for jEE Advanced. Best TestResponse for jEE Advanced. Best TestResponse for jEE Advanced. Best TestResponse for jEE Advanced. Best TestResponse for jEE Advanced. Best TestResponse for jEE Advanced. Best TestResponse for jEE Advanced. Best TestResponse for jEE Advanced. Best TestResponse for jEE Advanced.',
//     writter: 'Vikash Gupta and P. Joshi',
//     publication: 'Balajji',
//     subject: 'Maths',
//     for: 'Advanced',
//     imageUrl: 'irodov.png'
// });
// TestResponse1.save();

module.exports = TestResponse;