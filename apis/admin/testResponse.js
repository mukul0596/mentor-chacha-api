const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('../../passport-config');
const Test = require('../../models/test');
const Institute = require('../../models/institute');
const User = require('../../models/user');
const TestResponse = require('../../models/testResponse');

const testResponseRouter = express.Router();
testResponseRouter.use(bodyParser.json());


testResponseRouter.get('/:instituteId/:testId/testResponseList', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const test = await Test.findById(req.params.testId);

    const institute = await Institute.findById(req.params.instituteId);
    await institute.populate({ path: "users", model: User, match: {stream: test.for, class: test.class} }).execPopulate();
    const testResponseList = institute.users;
    
    res.send(testResponseList);
});

testResponseRouter.get('/:testId/:userId', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const testResponse = await TestResponse.findOne({testId: req.params.testId, userId: req.params.userId});
    if (testResponse)
        res.send(testResponse);
    else
        res.send({});
});

testResponseRouter.post('/', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const testResponse = new TestResponse(req.body);
    testResponse.save()
    .then((testResponse) => {
        res.send({success: true, testResponse});
    }).catch((err) => {
        res.send({success: false, err});
    });
});

testResponseRouter.put('/:id', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    TestResponse.findByIdAndUpdate(req.params.id, req.body)
    .then((testResponse) => {
        res.send({success: true, testResponse});
    }).catch((err) => {
        res.send({success: false, err});
    });
});

module.exports = testResponseRouter;