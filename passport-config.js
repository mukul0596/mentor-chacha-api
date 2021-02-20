const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/user')

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies)
        token = req.cookies["access_token"];
    return token;
}

passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.PASSPORT_JWT_SECRET
}, (payload, done) => {
    User.findOne({ phone: payload.phone }, (err, user) => {
        if (err)
            return done(err, false);
        if (user)
            return done(null, user);
        else 
            return done(null, false);
    });
}));

passport.use(new LocalStrategy({ usernameField: 'phone' }, (phone, password, done) => {
    User.findOne({ phone }, (err, user) => {
        if (err)
            return done(err);
        if (!user)
            return done(null, false);
        user.comparePassword(password, done);
    })
}));