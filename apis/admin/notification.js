const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('../../passport-config');
const Notification = require('../../models/notification');

const notificationRouter = express.Router();
notificationRouter.use(bodyParser.json());


notificationRouter.get('/general/titles', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const notifications = await Notification.find({ instituteId: null }, {description: 0}).sort({ createdAt: 'desc'}).exec();
    res.send(notifications);
});

notificationRouter.get('/:instituteId/titles', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const notifications = await Notification.find({ instituteId: req.params.instituteId }, {description: 0}).sort({ createdAt: 'desc'}).exec();
    res.send(notifications);
});

notificationRouter.get('/:id', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const notification = await Notification.findById(req.params.id, {__v: 0, readBy: 0, createdAt: 0, updatedAt: 0, instituteId: 0, _id: 0});
    res.send(notification);
});

notificationRouter.post('/', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const notification = new Notification(req.body);
    notification.save()
    .then((notification) => {
        res.send({success: true, notification});
    }).catch((err) => {
        res.send({success: false, err});
    });
});

notificationRouter.put('/:id', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    Notification.findByIdAndUpdate(req.params.id, req.body)
    .then((notification) => {
        res.send({success: true, notification});
    }).catch((err) => {
        res.send({success: false, err});
    });
});

notificationRouter.delete('/:id', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    Notification.findByIdAndDelete(req.params.id)
    .then((data) => {
        res.send({success: true, data});
    }).catch((err) => {
        res.send({success: false, err});
    });
});

module.exports = notificationRouter;