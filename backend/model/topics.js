const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isVideo:{
        type: Boolean,
        required: true,
        default: false
    },
    testCases: [String],
    testInputs: [String] // Added the testInputs field here
});

module.exports = mongoose.model('Topic', TopicSchema);
