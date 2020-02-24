const log = require('../services/log');
const ebay = require('../services/eBay');
const Alert = require('../models/alert');
const Handlebars = require("handlebars");
const { get } = require('../services/db');
const { schedule, getTemplate } = require('../services/email');

module.exports = (db, frequency) => {
    try {
        return getAlerts(db, frequency);
    } catch (error) {
        log.error({ message: 'priceAlert', meta: error });
    }
}

const getAlerts = async (db, frequency) => {
    const alerts = await get(db, Alert, { frequency: frequency.value });
    return !!alerts.length && searchAlerts(db, frequency, alerts);
}

const searchAlerts = async (db, frequency, alerts) => {
    const searches = [];
    for (const alert of alerts) {
        searches.push(ebay.findItemsByKeywords(alert.searchPhrase));
    }
    const data = await Promise.allSettled(searches);
    
    handleFailed(data, 'findItemsByKeywords');

    const items = data.filter(o =>  o.status === 'fulfilled');

    return !!items.length && scheduleEmails(db, frequency, alerts, items);
}

const scheduleEmails = async (db, frequency, alerts, items) => {
    const [{ subject }, compiler] = await getEmailTemplate(db);
    const emails = [];
    for (let i = 0; i < items.length; i++) {
        emails.push(schedule(db, subject, compiler(items[i].value), alerts[i].email, frequency));
    }
    const data = await Promise.allSettled(emails)
    handleFailed(data, 'scheduleEmail');
    return; 
}

let emailTemplate = null;
let emailCompiler = null;
const getEmailTemplate = async db => {
    if (!emailTemplate) emailTemplate = await getTemplate(db, 'alert');
    if (!emailCompiler) emailCompiler = Handlebars.compile(emailTemplate.html);
    return [ emailTemplate, emailCompiler ];
}

const handleFailed = async (data, processName) => {
    const failed = data.filter(o => o.status === 'rejected');
    !!failed.length && log.error({ 
        message: `priceAlert:${processName}`, 
        meta: failed 
    });

}


