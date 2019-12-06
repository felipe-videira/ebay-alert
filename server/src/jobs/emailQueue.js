const Email = require('../models/Email');
const sendEmail = require('../services/sendEmail');

module.exports = async frequency => {
    try {
        console.log(`[emailQueue-f${frequency}]`);

        const emails = await Email.find({ frequency, deleted: 0 });

        console.log(`[emailQueue-f${frequency}] emails: `, emails);

        const sendEmailRequests = [];

        for (const email of emails) {
            sendEmailRequests.push(sendEmail(email));
        }

        const emailsSendedResult = await Promise.all(sendEmailRequests);

        console.log(`[emailQueue-f${frequency}] emailsSendedResult: `, emailsSendedResult);

    } catch (error) {
        console.log(`[emailQueue-f${frequency}] error: `, error);

        return;
    }
}