const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('../../passport-config');
const TestPaper = require('../../models/testPaper');
const TestResponse = require('../../models/testResponse');
const TestResult = require('../../models/testResult');
const QuestionBank = require('../../models/questionBank');

const testResultRouter = express.Router();
testResultRouter.use(bodyParser.json());


testResultRouter.get('/', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const testResults = await TestResult.find({ });
    res.send(testResults);
});

testResultRouter.get('/:testId', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const testResults = await TestResult.find({ testId: req.params.testId }, null, {sort: {rank: 1}});
    res.send(testResults);
});

testResultRouter.post('/:testId', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const testResults = [];
    const testPaper = await TestPaper.findOne({ testId: req.params.testId });
    let totalMarks = 0, marksSum = 0, subjectMarksSum = {}, subjectHighest = {};
    const subjectQuestions = {};
    const subjectMarks = {};
    testPaper.questions.map(question => {
        totalMarks += question.marks;
        if(subjectQuestions[question.subject]) {
            subjectQuestions[question.subject] += 1;
        } else {
            subjectQuestions[question.subject] = 1;
        }
        if(subjectMarks[question.subject]) {
            subjectMarks[question.subject] += question.marks;
        } else {
            subjectMarks[question.subject] = question.marks;
        }
    });

    const testResponses = await TestResponse.find({ testId: req.params.testId });

    const evaluate = (questionId, answer, userId) => {
        const question = testPaper.questions.find(ques => ques._id.toString() == questionId);
        
        let score;

        if (question.type != 'MultipleMCQ')
            score = question.answer[0] == answer[0] ? question.marks : (-1 * question.negativeMarks);
        else {
            let correctCount = 0, isWrong = false;
            answer.map(ans => {
                if (question.answer.includes(ans)) {
                    correctCount++;
                } else {
                    isWrong = true;
                }
            });
            if (isWrong) {
                score = -1 * question.negativeMarks;
            } else {
                if (correctCount == question.answer.length) {
                    score = question.marks;
                } else {
                    if (question.partialMarking) {
                        score = correctCount * question.marks/question.options.length;
                    } else {
                        score = -1 * question.negativeMarks;
                    }
                }
            }
        }

        if (answer.length == 0 || score <= 0) {
            const newQues = new QuestionBank({
                question: question.question,
                type: question.type,
                subject: question.subject,
                topic: question.topic,
                marks: question.marks,
                negativeMarks: question.negativeMarks,
                partialMarking: question.partialMarking,
                difficulty: question.difficulty,
                options: question.options,
                answer: question.answer,
                testId: req.params.testId,
                userId
            });
            newQues.save();
        }

        return {score, subject: question.subject};
    }

    testResponses.map(testResponse => {
        let totalScore = 0, attempted = 0, correct = 0, subjectStats = {};
        testResponse.response.map(response => {
            const eval = evaluate(response.questionId, response.answer, testResponse.userId);
            response.score = eval.score;
            totalScore += eval.score;
            if (response.answer.length > 0)
                attempted++;
            if (eval.score > 0)
                correct++;
            if (subjectStats[eval.subject]) {
                if (response.answer.length > 0) {
                    subjectStats[eval.subject].attempted += 1;
                    subjectStats[eval.subject].marks += eval.score;

                    if (eval.score > 0)
                        subjectStats[eval.subject].correct += 1;
                    else
                        subjectStats[eval.subject].negativeMarks += eval.score;
                }
            } else {
                const obj = {
                    attempted: 0,
                    correct: 0,
                    marks: 0,
                    negativeMarks: 0
                }
                if (response.answer.length > 0) {
                    obj.attempted += 1;
                    obj.marks += eval.score;

                    if (eval.score > 0)
                        obj.correct += 1;
                    else
                        obj.negativeMarks += eval.score;
                }
                subjectStats[eval.subject] = {...obj};
            }
        });
        testResponse.save();

        marksSum += totalScore;

        let subjectStatsArr = [];
        let negativeMarks = 0;

        Object.keys(subjectStats).map(subject => {
            if (subjectMarksSum[subject]) {
                subjectMarksSum[subject] += subjectStats[subject].marks;
            } else {
                subjectMarksSum[subject] = subjectStats[subject].marks;
            }

            if (subjectHighest[subject]) {
                if (subjectHighest[subject] < subjectStats[subject].marks) {
                    subjectHighest[subject] = subjectStats[subject].marks;
                }
            } else {
                subjectHighest[subject] = subjectStats[subject].marks;
            }

            negativeMarks += subjectStats[subject].negativeMarks;

            subjectStatsArr.push({
                subject,
                marks: subjectStats[subject].marks,
                negativeMarks: subjectStats[subject].negativeMarks,
                totalMarks: subjectMarks[subject],
                attempted: subjectStats[subject].attempted,
                correct: subjectStats[subject].correct,
                unattempted: subjectQuestions[subject] - subjectStats[subject].attempted,
                incorrect: subjectStats[subject].attempted - subjectStats[subject].correct,
                totalQuestions: subjectQuestions[subject],
                accuracy: subjectStats[subject].correct / subjectStats[subject].attempted * 100
            })
        })

        testResults.push({
            testId: req.params.testId,
            userId: testResponse.userId,
            marks: totalScore,
            totalMarks,
            negativeMarks,
            percentage: totalScore / totalMarks * 100,
            totalStudents: testResponses.length,
            attempted,
            unattempted: testPaper.questions.length - attempted,
            correct,
            incorrect: attempted - correct,
            totalQuestions: testPaper.questions.length,
            accuracy: correct / attempted * 100,
            subjectStats: subjectStatsArr
        });
    });

    testResults.sort((res1, res2) => res2.marks - res1.marks);


    testResults.map((result, i) => {
        const updatedResult = {...result};
        updatedResult.subjectStats.map(subjectStat => {
            subjectStat.average = subjectMarksSum[subjectStat.subject] / testResponses.length;
            subjectStat.highestMarks = subjectHighest[subjectStat.subject];
        });

        TestResult.findOneAndUpdate({ testId: result.testId, userId: result.userId }, { ...updatedResult, highestMarks: testResults[0].marks, rank: (i + 1), average: (marksSum / testResponses.length) }, { upsert: true, new: true, setDefaultsOnInsert: true }, (error, resul) => {
            if (error) 
                console.log(error);
            else
                return;
        });
    });

    res.send({success: true});
});

testResultRouter.put('/:id', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    TestResult.findByIdAndUpdate(req.params.id, req.body)
    .then((testResult) => {
        res.send({success: true, testResult});
    }).catch((err) => {
        res.send({success: false, err});
    });
});

module.exports = testResultRouter;