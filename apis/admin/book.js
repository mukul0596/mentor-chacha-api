const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('../../passport-config');
const Book = require('../../models/book');

const bookRouter = express.Router();
bookRouter.use(bodyParser.json());


bookRouter.get('/', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
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

bookRouter.post('/', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const book = new Book(req.body);
    book.save()
    .then((book) => {
        res.send({success: true, book});
    }).catch((err) => {
        res.send({success: false, err});
    });
});

bookRouter.put('/:id', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    Book.findByIdAndUpdate(req.params.id, req.body)
    .then((book) => {
        res.send({success: true, book});
    }).catch((err) => {
        res.send({success: false, err});
    });
});

bookRouter.delete('/:id', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    Book.findByIdAndDelete(req.params.id)
    .then((book) => {
        res.send({success: true, book});
    }).catch((err) => {
        res.send({success: false, err});
    });
});

module.exports = bookRouter;