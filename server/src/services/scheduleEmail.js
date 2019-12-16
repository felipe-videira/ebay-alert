const Email = require('../models/email');

module.exports = async (subject, html, to, frequency) => {
    return new Email({ 
        subject,
        html,
        to,
        from: process.env.EMAIL_SENDER,
        frequency: frequency.value
    }).save();
}