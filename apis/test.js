const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('../passport-config');
const Test = require('../models/test');

const testRouter = express.Router();
testRouter.use(bodyParser.json());


testRouter.get('/', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const tests = await Test.find({ instituteId: req.user.instituteId, class: req.user.class, for: req.user.stream });
    res.send(tests);
});

testRouter.get('/:testId', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const test = await Test.findById(req.params.testId);
    res.send(test);
});

module.exports = testRouter;