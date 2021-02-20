const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('../passport-config');
const Book = require('../models/book');

const bookRouter = express.Router();
bookRouter.use(bodyParser.json());


bookRouter.get('/',  async (req, res, next) => {
    const phyBooks = await Book.find({ subject: 'Physics' });
    const chemBooks = await Book.find({ subject: 'Chemistry' });
    const mathBooks = await Book.find({ subject: 'Maths' });
    const bioBooks = await Book.find({ subject: 'Biology' });
    res.send({
        Physics: phyBooks,
        Chemistry: chemBooks,
        Maths: mathBooks,
        Biology: bioBooks
    });
});

module.exports = bookRouter;