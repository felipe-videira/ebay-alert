const log = require('../services/log');
const Email = require('../models/email');
const { get } = require('../services/db');
const { send } = require('../services/email');

module.exports = async (db,frequency) => {
    try {
        return getEmails(db, frequency);
    } catch (error) {
        log.error({ message: 'emailQueue', meta: error });
    }
}

const getEmails = async (db, frequency) => {
    const emails = await get(db, Email, { 
        frequency: frequency.value, 
        sended: 0 
    });
    return !!emails.length && sendEmails(db, emails);
}

const sendEmails = async (db, emails) => {
    const toSend = [];
    for (const email of emails) {
        toSend.push(send(db, email));
    }
    return Promise.allSettled(toSend).then(handleFailed);
}

const handleFailed = data => {
    const failed = data.filter(o => o.status === 'rejected');
    !!failed.length && log.error({
        message: 'emailQueue:send',
        meta: failed
    });
}