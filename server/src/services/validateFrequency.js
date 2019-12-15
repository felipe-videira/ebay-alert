const Frequency = require('../models/frequency');

module.exports = value => {
    return Frequency.find({ value, deleted: 0 }, { _id: 1 }).limit(1);
}