const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        enum: ['Physics', 'Chemistry', 'Maths', 'Biology'],
        required: true
    }
});

const Topic = mongoose.model('Topic', TopicSchema);


// const TOPICS = [
//     "Mathematical Tool",
//     "Rectilinear Motion",
//     "Projectile Motion",
//     "Relative Motion",
//     "Newton's Laws of Motion",
//     "Friction",
//     "Work Power Energy",
//     "Circular Motion",
//     "Center of Mass",
//     "Rigid Body Dynamics",
//     "Simple Harmony Motion",
//     "Fluid Mechanics",
//     "Elasticity & Viscocity",
//     "String Waves",
//     "Unit & Dimension",
//     "Sound Waves",
//     "Kinetic Theory of Gases",
//     "Thermodynamics",
//     "Calorimetry & Thermal Expansion",
//     "Error & Experiment",
//     "Miscellaneous",
// ]

// const Topic1 = new Topic({
//     name: 'Trying to create a Test Topic for testing purpose. And there you go.',
// });
// Topic1.save();

module.exports = Topic;