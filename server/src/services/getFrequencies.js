const { get } = require('./db');
const Frequency = require('../models/frequency');

module.exports = () => {
    return get(Frequency, {}, { value: 1, label: 1 });
}