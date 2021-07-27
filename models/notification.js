const mongoose = require('mongoose');

const NotifictionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    readBy: [String],
    instituteId: {
        ref: 'Institute',
        type: mongoose.Schema.Types.ObjectId
    }
}, {timestamps: true});

const Notifiction = mongoose.model('Notifiction', NotifictionSchema);

// const Notifiction1 = new Notifiction({
//     title: 'Trying to create a Test Notifiction for testing purpose. And there you go.',
//     description: 'This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. This is a Test Notifiction. '
// });
// Notifiction1.save();

module.exports = Notifiction;