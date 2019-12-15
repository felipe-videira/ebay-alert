const cron = require("node-cron");
const emailQueue = require('./emailQueue');
const priceAlert = require('./priceAlert');
const getFrequencies = require('../services/getFrequencies');

let retryInterval = null;
const init = () => {
    getFrequencies().then(frequencies => {
        if (!frequencies.length) {
            retryInterval = setInterval(() => init(), 2000);
        } else {
            clearInterval(retryInterval);
        }

        for (const frequency of frequencies) {
            cron.schedule(`*/${frequency.value} * * * *`, () => priceAlert(frequency));
            cron.schedule(`*/${frequency.value} * * * *`, () => emailQueue(frequency));
        }
    })
}

module.exports.init = init;
