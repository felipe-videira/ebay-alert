const Email = require('../models/email');

module.exports = async (subject, html, to) => {
    try {
        return new Email({ 
            subject,
            html,
            to,
            from: process.env.EMAIL_SENDER 
        }).save();
    } catch (error) {
        console.log("[scheduleEmail] error: ", error);

        throw error;
    }
}