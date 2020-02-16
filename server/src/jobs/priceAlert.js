const ebay = require('../services/eBay');
const Alert = require('../models/alert');
const Handlebars = require("handlebars");
const { partition } = require('../utils');
const { get } = require('../services/db');
const logger = require('../services/logger');
const scheduleEmail = require('../services/scheduleEmail');
const getEmailTemplate = require('../services/getEmailTemplate');

let emailTemplate = null;
let emailCompiler = null;

module.exports = async frequency => {
    try {
        const alerts = await get(Alert, { 
            frequency: frequency.value, 
        });

        const searches = [];
        for (const { searchPhrase } of alerts) {
            searches.push(ebay.findItemsByKeywords(searchPhrase));
        }
        
        const [ 
            items, 
            failedItems 
        ] = partition(await Promise.allSettled(searches), o => o.status === 'fulfilled');

        if (!!failedItems.length) {
            logger.error({
                message: 'priceAlert:findItemsByKeywords',
                meta: failedItems
            });
        }

        if (!items.length) return;

        if (!emailTemplate) emailTemplate = await getEmailTemplate('alert');

        if (!emailCompiler) emailCompiler = Handlebars.compile(emailTemplate.html);

        const emails = [];
        for (let i = 0; i < items.length; i++) {
            emails.push(scheduleEmail(
                emailTemplate.subject, 
                emailCompiler(items[i].value), 
                alerts[i].email, 
                frequency
            ));
        }

        const failed = (await Promise.allSettled(emails))
            .filter(o => o.status === 'rejected');

            
        if (!!failed.length) {
            logger.error({
                message: 'priceAlert:scheduleEmail',
                meta: failed
            });
        }

    } catch (error) {
        logger.error({ message: 'priceAlert', meta: error });

        return;
    }
}