const mongoose = require('mongoose');

const ApplicationSchema = mongoose.Schema({
    sended_at: {
        type: Date,
        default: Date.now
    },
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    problem: {
        type: String,
        required: true
    }
});

const Application = mongoose.model('Application', ApplicationSchema)

module.exports = Application;