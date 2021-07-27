const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('../../passport-config');
const TestPaper = require('../../models/testPaper');

const testPaperRouter = express.Router();
testPaperRouter.use(bodyParser.json());


testPaperRouter.get('/:testId', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const testPaper = await TestPaper.findOne({testId: req.params.testId});
    if (testPaper)
        res.send(testPaper);
    else
        res.send({});
});

testPaperRouter.post('/', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const testPaper = new TestPaper(req.body);
    testPaper.save()
    .then((testPaper) => {
        res.send({success: true, testPaper});
    }).catch((err) => {
        res.send({success: false, err});
    });
});

testPaperRouter.put('/:id', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    TestPaper.findByIdAndUpdate(req.params.id, req.body)
    .then((testPaper) => {
        res.send({success: true, testPaper});
    }).catch((err) => {
        res.send({success: false, err});
    });
});

module.exports = testPaperRouter;