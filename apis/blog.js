const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('../passport-config');
const Blog = require('../models/blog');

const blogRouter = express.Router();
blogRouter.use(bodyParser.json());


blogRouter.get('/titles', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const blogs = await Blog.find({ }, {description: 0});
    res.send(blogs);
});

blogRouter.get('/:id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);
    res.send(blog);
});

module.exports = blogRouter;