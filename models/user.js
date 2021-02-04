const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        min: 10,
        max: 10
    },
    password: {
        type: String,
        required: true
    },
    email: String,
    coachingName: String,
    class: {
        type: Number,
        required: true
    },
    age: Number,
    gender: String,
    category: String
});

UserSchema.pre('save', function(next) {
    if (!this.isModified('password'))
        return next();
    bcrypt.hash(this.password, 10, (err, passwordHash) => {
        if (err)
            return next(err);
        this.password = passwordHash;
        next();
    });
});

UserSchema.method.comparePassword = function(passport, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err)
            return cb(err);
        else {
            if (!isMatch)
                return cb(null, isMatch);
            return cb(null, this);
        }
    })
}

const User = mongoose.model('User', UserSchema);

// const User1 = new User({
//     name: 'Test'
//     phone: 9876543210
//     email: 'test@test.com'
//     coachingName: 'Test Coaching'
//     class: 11
//     age: 16
//     gender: 'Male'
//     category: 'General'
// });
// User1.save();

module.exports = User;