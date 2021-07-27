const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('../passport-config');
const Notification = require('../models/notification');

const notificationRouter = express.Router();
notificationRouter.use(bodyParser.json());


notificationRouter.get('/titles', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const notifications = await Notification.find({ instituteId: {$in: [null, req.user.instituteId]} }, {description: 0}).sort({ createdAt: 'desc'}).exec();
    res.send(notifications);
});

notificationRouter.get('/:id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    Notification.findByIdAndUpdate(req.params.id, {$push: {readBy: req.user._id}})
    .then((notification) => {
        res.send(notification);
    }).catch((err) => {
        res.send(err);
    })
});

module.exports = notificationRouter;