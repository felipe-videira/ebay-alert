const mongoose = require('mongoose');
const { emailValidation } = require('../utils');

const emailSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    html: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
        validate: [emailValidation, '{PATH} invalid.']
    },
    to: [{
        type: String,
        required: true,
        validate: [emailValidation, '{PATH} invalid.']
    }],
    frequency: {
        type: String,
        required: true,
    },
    sended: {
        type: Number,
        default: 0
    },
    deleted: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date().toISOString()
    },
    lastModifiedAt: {
        type: Date,
        default: new Date().toISOString()
    }
});

module.exports = mongoose.model('Email', emailSchema);