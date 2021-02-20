const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('../passport-config');
const JWT = require('jsonwebtoken');
const User = require('../models/user');

const userRouter = express.Router();
userRouter.use(bodyParser.json());


userRouter.post('/login', passport.authenticate('local', {session: false}),async (req, res, next) => {
    if (req.isAuthenticated()) {
        const token = JWT.sign({ phone: req.user.phone }, process.env.PASSPORT_JWT_SECRET);
        res.cookie('access_token', token, {httpOnly: true, sameSite: true});
        res.status(200).json({isAuthenticated: true, user: req.user});
    }
});

userRouter.get('/logout', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    res.clearCookie('access_token');
    res.json({success: true, user: {}});
});

userRouter.get('/authenticated', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    res.status(200).json({ isAuthenticated: true, user: req.user });
});

userRouter.put('/updateProfile', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    User.findByIdAndUpdate(req.user._id, req.body).then((user) => {
        res.status(200).json({ success: true, user });
    }).catch((err) => {
        res.json({ success: false, err })
    });
});

userRouter.put('/resetPassword', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const user = await User.findById(req.user._id);
    user.comparePassword(req.body.oldPassword, (err, isMatch) => {
        if (err) 
            return res.json({ success: false, err });
        
        if (isMatch) {
            user.password = req.body.newPassword;
            user.save().then((user) => {
                res.status(200).json({ success: true, user });
            });
        } else {
            res.status(400).json({ success: false, err: {msgBody: 'Incorrect password!'} });
        }
    });
});

module.exports = userRouter;