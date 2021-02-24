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



passport.use('admin-jwt', new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.PASSPORT_JWT_SECRET
}, (payload, done) => {
    if (payload.username == process.env.ADMIN_USERNAME) {
        return done(null, true);
    }

    return done(null, false);
}));

passport.use('admin-local', new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
    if (username == process.env.ADMIN_USERNAME && password == process.env.ADMIN_PASSWORD) {
        return done(null, true);
    }

    return done(null, false);
}));