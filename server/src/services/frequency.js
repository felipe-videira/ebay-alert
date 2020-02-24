const { get, exists, } = require('./db');
const Frequency = require('../models/frequency');

module.exports = {
    get: db => {
        return get(db, Frequency, {}, { value: 1, label: 1 });
    },
    validate: (db, value) => {
        return exists(db, Frequency, { value });
    }
}