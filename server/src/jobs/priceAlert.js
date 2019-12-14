const ebay = require('../services/eBay');
const Alert = require('../models/alert');
const Handlebars = require("handlebars");
const scheduleEmail = require('../services/scheduleEmail');
const { html: emailHtml, subject: emailSubject } = require('../emailTemplates/priceAlert');

let emailTemplate = null;

module.exports = async frequency => {
    try {
        console.log(`priceAlert of frequency: ${frequency} starting!`)

        const alerts = await Alert.find({ frequency, deleted: 0 });

        const itemsRequests = [];
        for (const { searchPhrase } of alerts) {
            itemsRequests.push(ebay.findItemsByKeywords(searchPhrase));
        }
        const itemsBySearchPhrase = await Promise.all(itemsRequests);

        if (!emailTemplate && !!itemsBySearchPhrase.length) {
            emailTemplate = Handlebars.compile(emailHtml);
        }

        const scheduleEmailRequests = [];
        for (let i = 0; i < itemsBySearchPhrase.length; i++) {
            scheduleEmailRequests.push(
                scheduleEmail(emailSubject, emailTemplate(itemsBySearchPhrase[i]), alerts[i].email, frequency)
            );
        }
        await Promise.all(scheduleEmailRequests);

    } catch (error) {
        // TODO: tratar erro
        return;
    }
}