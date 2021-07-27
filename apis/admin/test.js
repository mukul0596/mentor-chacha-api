const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('../../passport-config');
const Test = require('../../models/test');

const testRouter = express.Router();
testRouter.use(bodyParser.json());


testRouter.get('/', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const tests = await Test.find({ });
    res.send(tests);
});

testRouter.get('/:id', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const test = await Test.findById(req.params.id, {__v: 0, _id: 0, instituteId: 0});
    res.send(test);
});

testRouter.post('/', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const test = new Test(req.body);
    test.save()
    .then((test) => {
        res.send({success: true, test});
    }).catch((err) => {
        res.send({success: false, err});
    });
});

testRouter.put('/:id', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    Test.findByIdAndUpdate(req.params.id, req.body)
    .then((test) => {
        res.send({success: true, test});
    }).catch((err) => {
        res.send({success: false, err});
    });
});

testRouter.delete('/:id', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    Test.findByIdAndDelete(req.params.id)
    .then((test) => {
        res.send({success: true, test});
    }).catch((err) => {
        res.send({success: false, err});
    });
});

module.exports = testRouter;