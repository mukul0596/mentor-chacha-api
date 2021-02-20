const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    password: {
        type: String,
        required: true
    },
    email: String,
    coachingName: String,
    class: {
        type: String,
        required: true,
        enum: ['11', '12', '13']
    },
    age: Number,
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    category: {
        type: String,
        enum: ['General', 'OBC', 'SC', 'ST']
    }
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

UserSchema.methods.comparePassword = function(password, cb) {
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
//     name: 'Tarun Randi',
//     phone: '1234567890',
//     password: '12345',
//     email: 'tarun@randi.com',
//     coachingName: 'Test Coaching',
//     class: '11',
//     age: 16,
//     gender: 'Male',
//     category: 'General',
// });
// User1.save();

module.exports = User;