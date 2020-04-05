const cron = require("node-cron");
const emailQueue = require('./emailQueue');
const priceAlert = require('./priceAlert');
const frequencyService = require('../services/frequency');

let retryInterval = null;

const init = db => {
    frequencyService.get(db).then(frequencies => {
        if (!frequencies.length) {
            retryInterval = setInterval(() => init(), 2000);
        } else {
            clearInterval(retryInterval);
        }

        for (const frequency of frequencies) {
            cron.schedule(`*/${frequency.value} * * * *`, () => priceAlert(db, frequency));
            cron.schedule(`*/${frequency.value} * * * *`, () => emailQueue(db, frequency));
        }
    })
}

module.exports.init = init;

