const Email = require('../models/email');

module.exports = async (subject, html, to, frequency) => {
    try {
        return new Email({ 
            subject,
            html,
            to,
            from: process.env.EMAIL_SENDER,
            frequency
        }).save();
    } catch (error) {
        console.log("[scheduleEmail] error: ", error);

        throw error;
    }
}