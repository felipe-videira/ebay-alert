const Frequency = require('../src/models/frequency');
const Locale = require('../src/models/locale');
const frequencies = require('./frequencies.json');
const locales = require('./locales.json');

Frequency.exists().then(exists => {
    !exists && Frequency.insertMany(frequencies);
});

Locale.exists().then(exists => {
    !exists && Locale.insertMany(locales);
});


