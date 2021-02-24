const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('../../passport-config');
const Institute = require('../../models/institute');

const instituteRouter = express.Router();
instituteRouter.use(bodyParser.json());


instituteRouter.get('/', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const institutes = await Institute.find({ });
    res.send(institutes);
});

instituteRouter.get('/:id', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const institute = await Institute.findById(req.params.id);
    res.send(institute);
});

instituteRouter.post('/', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const institute = new Institute(req.body);
    institute.save()
    .then((institute) => {
        res.send({success: true, institute});
    }).catch((err) => {
        res.send({success: false, err});
    });
});

instituteRouter.put('/:id', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    Institute.findByIdAndUpdate(req.params.id, req.body)
    .then((institute) => {
        res.send({success: true, institute});
    }).catch((err) => {
        res.send({success: false, err});
    });
});

instituteRouter.delete('/:id', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    Institute.findByIdAndDelete(req.params.id)
    .then((data) => {
        res.send({success: true, data});
    }).catch((err) => {
        res.send({success: false, err});
    });
});

module.exports = instituteRouter;