const Email = require('../models/email');
const sendEmail = require('../services/sendEmail');

module.exports = async frequency => {
    try {
        const emails = await Email.find({ 
            frequency: frequency.value, 
            deleted: 0,
            sended: 0 
        });

        const sendEmailRequests = [];
        for (const email of emails) {
            sendEmailRequests.push(sendEmail(email));
        }
        await Promise.all(sendEmailRequests);

    } catch (error) {
        return;
    }
}