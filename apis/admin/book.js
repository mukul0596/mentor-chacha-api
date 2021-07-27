const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('../../passport-config');
const Book = require('../../models/book');
const multer = require('multer');
const path = require('path');

const bookRouter = express.Router();
bookRouter.use(bodyParser.json());


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });


bookRouter.get('/', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const books = await Book.find({ });
    
    res.send(books);
});

bookRouter.get('/:id', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    const book = await Book.findById(req.params.id, {__v: 0, _id: 0});
    res.send(book);
});

bookRouter.post('/', passport.authenticate('admin-jwt', {session: false}), upload.single('image'), async (req, res, next) => {
    const book = new Book({...req.body, image: req.file.filename});
    book.save()
    .then((book) => {
        res.send({success: true, book});
    }).catch((err) => {
        res.send({success: false, err});
    });
});

bookRouter.put('/:id', passport.authenticate('admin-jwt', {session: false}), upload.single('image'), async (req, res, next) => {
    Book.findByIdAndUpdate(req.params.id, {...req.body, image: req.file.filename})
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