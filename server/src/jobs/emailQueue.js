const Email = require('../models/email');
const sendEmail = require('../services/sendEmail');

module.exports = async frequency => {
    try {
        console.log(`emailQueue of frequency: ${frequency} starting!`)
        
        const emails = await Email.find({ frequency, deleted: 0 });

        console.log('emails:', emails)
        
        const sendEmailRequests = [];
        for (const email of emails) {
            sendEmailRequests.push(sendEmail(email));
        }
        await Promise.all(sendEmailRequests);

    } catch (error) {
        // TODO: tratar erro
        return;
    }
}