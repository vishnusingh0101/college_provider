const mongoose = require('mongoose');

const joinUsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    college: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    joinAs: {
        type: String,
        required: true,
        enum: ['Volunteer', 'Partner', 'Intern', 'Other'],
        trim: true
    },
    about: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('JoinUs', joinUsSchema);