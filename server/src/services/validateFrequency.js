const Frequency = require('../models/frequency');

module.exports = async value => {
    const frequency = await Frequency.find({ value, deleted: 0 }, { _id: 1 }).limit(1);

    return !!frequency.length;
}