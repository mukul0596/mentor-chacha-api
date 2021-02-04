const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('../passport-config');
const JWT = require('jsonwebtoken');
const User = require('../models/user');

const userRouter = express.Router();
userRouter.use(bodyParser.json());


userRouter.post('/login', passport.authenticate('local', {session: false}),async (req, res, next) => {
    if (req.isAuthenticated) {
        const token = JWT.sign({ phone: req.user.phone }, process.env.PASSPORT_JWT_SECRET);
        res.cookie('access_token', token, {httpOnly: true, sameSite: true});
        res.status(200).json({isAuthenticated: true, user: req.user});
    }
});

userRouter.get('/logout', passport.authenticate('jwt', {session: false}),async (req, res, next) => {
    res.clearCookie('access_token');
    res.json({success: true, user: {}})
});

module.exports = userRouter;