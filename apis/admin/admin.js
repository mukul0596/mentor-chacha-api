const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('../../passport-config');
const JWT = require('jsonwebtoken');

const userRouter = express.Router();
userRouter.use(bodyParser.json());


userRouter.post('/login', passport.authenticate('admin-local', {session: false}),async (req, res, next) => {
    if (req.isAuthenticated()) {
        const token = JWT.sign({ username: req.body.username }, process.env.PASSPORT_JWT_SECRET);
        res.cookie('access_token', token, {httpOnly: true, sameSite: true});
        res.status(200).json({ isAuthenticated: true });
    }
});

userRouter.get('/logout', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    res.clearCookie('access_token');
    res.json({ success: true });
});

userRouter.get('/authenticated', passport.authenticate('admin-jwt', {session: false}), async (req, res, next) => {
    res.status(200).json({ isAuthenticated: true });
});

module.exports = userRouter;