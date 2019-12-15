const cron = require("node-cron");
const emailQueue = require('./emailQueue');
const priceAlert = require('./priceAlert');
const getFrequencies = require('../services/getFrequencies');

module.exports.init = () => {
    getFrequencies().then(frequencies => {
        for (const frequency of frequencies) {
            cron.schedule(`*/${frequency} * * * *`, () => priceAlert(frequency));
            cron.schedule(`*/${frequency} * * * *`, () => emailQueue(frequency));
        }
    })
}
