const mongoose = require('mongoose');

const InstituteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        maxlength: 10,
        minlength: 10
    },
    email: String,
    city: String,
});

InstituteSchema.virtual('students', {
    ref: 'Student',
    localField: '_id',
    foreignField: 'instituteId'
});

InstituteSchema.virtual('notifications', {
    ref: 'Notification',
    localField: '_id',
    foreignField: 'instituteId'
});


const Institute = mongoose.model('Institute', InstituteSchema);

// const Institute1 = new Institute({
//     name: 'Test Institute',
//     phone: '9876543210',
//     email: 'test@test.com',
//     city: 'TestCity'
// });
// Institute1.save();

module.exports = Institute;