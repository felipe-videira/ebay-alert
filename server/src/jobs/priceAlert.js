const ebay = require('../services/eBay');
const Alert = require('../models/alert');
const Handlebars = require("handlebars");
const scheduleEmail = require('../services/scheduleEmail');
const { html: emailHtml, subject: emailSubject } = require('../emailTemplates/priceAlert');

let emailTemplate = null;

module.exports = async frequency => {
    try {
        console.log(`[priceAlerts-f${frequency}]`);

        const alerts = await Alert.find({ frequency, deleted: 0 });

        console.log(`[priceAlerts-f${frequency}] alerts: `, alerts);

        const itemsRequests = [];
        for (const { searchPhrase } of alerts) {
            itemsRequests.push(ebay.findItemsByKeywords(searchPhrase));
        }
        const itemsBySearchPhrase = await Promise.all(itemsRequests);

        console.log(`[priceAlerts-f${frequency}] itemsBySearchPhrase: `, itemsBySearchPhrase);
        
        const scheduleEmailRequests = [];
        for (let i = 0; i < itemsBySearchPhrase.length; i++) {
            if (!emailTemplate) emailTemplate = Handlebars.compile(emailHtml);

            scheduleEmailRequests.push(scheduleEmail(emailSubject, emailTemplate(itemsBySearchPhrase[i]), alerts[i].email));
        }       
        const emailsScheduled = await Promise.all(scheduleEmailRequests);

        console.log(`[priceAlerts-f${frequency}] emailsScheduled: `, emailsScheduled);
    } catch (error) {
        console.log(`[priceAlerts-f${frequency}] error: `, error);

        return;
    }
}



