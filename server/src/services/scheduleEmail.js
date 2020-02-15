const { save } = require('./db');
const Email = require('../models/email');

module.exports = (subject, html, to, frequency) => {
    return save(Email, { 
        subject,
        html,
        to,
        from: process.env.EMAIL_SENDER,
        frequency: frequency.value
    });
}