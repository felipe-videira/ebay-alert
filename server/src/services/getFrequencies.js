const Frequency = require('../models/frequency');

module.exports = () => {
    return Frequency.find({ deleted: 0 }, { value: 1, label: 1 });
}