const cron = require("node-cron");
const sendEmail = require('./sendEmail')
const checkPriceAlerts = require('./checkPriceAlerts')
const { FREQUENCY_TYPES } = require('../utils/constants')

module.exports.init = () => {
    for (const frequency in FREQUENCY_TYPES) {
        cron.schedule(`0 0/${frequency} * 1/1 * ? *`, () => checkPriceAlerts(frequency));
        cron.schedule(`0 0/${frequency} * 1/1 * ? *`, () => sendEmail(frequency));
    }
}
