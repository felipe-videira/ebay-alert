const { exists } = require("./db");
const Frequency = require('../models/frequency');

module.exports = value => {
    return exists(Frequency, { value });
}