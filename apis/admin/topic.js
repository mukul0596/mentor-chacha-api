const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('../../passport-config');
const Topic = require('../../models/topic');

const topicRouter = express.Router();
topicRouter.use(bodyParser.json());


topicRouter.get('/', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const topics = await Topic.find({ });
    res.send(topics);
});

topicRouter.get('/:id', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const topic = await Topic.findById(req.params.id, {__v: 0, _id: 0});
    res.send(topic);
});

topicRouter.post('/', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const topic = new Topic(req.body);
    topic.save()
    .then((topic) => {
        res.send({success: true, topic});
    }).catch((err) => {
        res.send({success: false, err});
    });
});

topicRouter.put('/:id', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    Topic.findByIdAndUpdate(req.params.id, req.body)
    .then((topic) => {
        res.send({success: true, topic});
    }).catch((err) => {
        res.send({success: false, err});
    });
});

topicRouter.delete('/:id', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    Topic.findByIdAndDelete(req.params.id)
    .then((topic) => {
        res.send({success: true, topic});
    }).catch((err) => {
        res.send({success: false, err});
    });
});

module.exports = topicRouter;