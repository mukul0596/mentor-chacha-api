const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('../../passport-config');
const Institute = require('../../models/institute');
const User = require('../../models/user');

const studentRouter = express.Router();
studentRouter.use(bodyParser.json());


studentRouter.get('/all/:instituteId', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const institute = await Institute.findById(req.params.instituteId);
    await institute.populate({ path: "users", model: User }).execPopulate();
    const students = institute.users;
    res.send(students);
});

studentRouter.get('/:id', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const student = await User.findById(req.params.id, {__v: 0, password: 0, instituteId: 0, _id: 0});
    res.send(student);
});

studentRouter.post('/', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const student = new User({...req.body, password: `${req.body.email}#${req.body.age}`});
    student.save()
    .then((student) => {
        res.send({success: true, student});
    }).catch((err) => {
        res.send({success: false, err});
    });
});

studentRouter.put('/:id', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body)
    .then((student) => {
        res.send({success: true, student});
    }).catch((err) => {
        res.send({success: false, err});
    });
});

studentRouter.delete('/:id', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
    .then((data) => {
        res.send({success: true, data});
    }).catch((err) => {
        res.send({success: false, err});
    });
});

module.exports = studentRouter;