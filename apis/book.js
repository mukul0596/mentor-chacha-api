const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('../passport-config');
const Book = require('../models/book');

const bookRouter = express.Router();
bookRouter.use(bodyParser.json());


bookRouter.get('/', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const books = await Book.find({ });
    res.send(books);
});

module.exports = bookRouter;