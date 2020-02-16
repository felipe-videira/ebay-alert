const Email = require('../models/email');
const { get } = require('../services/db');
const logger = require('../services/logger');
const sendEmail = require('../services/sendEmail');

module.exports = async frequency => {
    try {
        const emails = await get(Email, { 
            frequency: frequency.value, 
            sended: 0 
        });

        const toSend = [];
        for (const email of emails) {
            toSend.push(sendEmail(email));
        }
        
        const failed = (await Promise.allSettled(toSend))
            .filter(o => o.status === 'rejected');

        if (!!failed.length) {
            logger.error({
                message: 'emailQueue:sendEmail',
                meta: failed
            });
        }

    } catch (error) {
        logger.error({ message: 'emailQueue', meta: error });

        return;
    }
}