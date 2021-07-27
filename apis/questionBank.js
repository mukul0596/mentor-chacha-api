const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('../passport-config');
const QuestionBank = require('../models/questionBank');

const questionBankRouter = express.Router();
questionBankRouter.use(bodyParser.json());


questionBankRouter.get('/topics', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const phyQuestionBanks = await QuestionBank.find({ userId: req.user._id, subject: 'Physics' }).distinct('topic');
    const chemQuestionBanks = await QuestionBank.find({ userId: req.user._id, subject: 'Chemistry' }).distinct('topic');
    const mathQuestionBanks = await QuestionBank.find({ userId: req.user._id, subject: 'Maths' }).distinct('topic');
    const bioQuestionBanks = await QuestionBank.find({ userId: req.user._id, subject: 'Biology' }).distinct('topic');
    res.send({
        Physics: phyQuestionBanks,
        Chemistry: chemQuestionBanks,
        Maths: mathQuestionBanks,
        Biology: bioQuestionBanks
    });
});

questionBankRouter.get('/:subject/:topic/question', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const questions = await QuestionBank.find({ userId: req.user._id, subject: req.params.subject, topic: req.params.topic });
    res.send(questions);
});

module.exports = questionBankRouter;