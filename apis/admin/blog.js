const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('../../passport-config');
const Blog = require('../../models/blog');

const blogRouter = express.Router();
blogRouter.use(bodyParser.json());


blogRouter.get('/titles', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const blogs = await Blog.find({ }, {description: 0});
    res.send(blogs);
});

blogRouter.get('/:id', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);
    res.send(blog);
});

blogRouter.post('/', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const blog = new Blog(req.body);
    blog.save()
    .then((blog) => {
        res.send({success: true, blog});
    }).catch((err) => {
        res.send({success: false, err});
    });
});

blogRouter.put('/:id', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    Blog.findByIdAndUpdate(req.params.id, req.body)
    .then((blog) => {
        res.send({success: true, blog});
    }).catch((err) => {
        res.send({success: false, err});
    });
});

blogRouter.delete('/:id', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    Blog.findByIdAndDelete(req.params.id)
    .then((blog) => {
        res.send({success: true, blog});
    }).catch((err) => {
        res.send({success: false, err});
    });
});

module.exports = blogRouter;