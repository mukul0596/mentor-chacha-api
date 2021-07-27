const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('../passport-config');
const TestResult = require('../models/testResult');
const Test = require('../models/test');

const testResultRouter = express.Router();
testResultRouter.use(bodyParser.json());


testResultRouter.get('/', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const testResults = await TestResult.find({ userId: req.user._id });
    res.send(testResults);
});

testResultRouter.get('/graphData', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const testResults = await TestResult.find({ userId: req.user._id },  {_id: 0, __v: 0, createdAt: 0, updatedAt: 0, userId: 0, marks: 0, totalMarks: 0, negativeMarks: 0, totalStudents: 0, attempted: 0, unattempted: 0, correct: 0, incorrect: 0, totalQuestions: 0, average: 0, highestMarks: 0, subjectStats: 0});
    const tests = await Test.find({ instituteId: req.user.instituteId, class: req.user.class, for: req.user.stream });
    res.send({testResults, tests});
});

testResultRouter.get('/:testId', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const testResult = await TestResult.findOne({ testId: req.params.testId, userId: req.user._id });
    res.send(testResult);
});

module.exports = testResultRouter;