const cron = require("node-cron");
const emailQueue = require('./emailQueue');
const priceAlert = require('./priceAlert');
const { FREQUENCY_TYPES } = require('../utils/constants');

module.exports.init = () => {
    for (const frequency of FREQUENCY_TYPES) {
        cron.schedule(`*/${frequency} * * * *`, () => priceAlert(frequency));
        cron.schedule(`*/${frequency} * * * *`, () => emailQueue(frequency));
    }
}
