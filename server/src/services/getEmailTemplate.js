const { getOne } = require('./db');

module.exports = type => {
    return getOne('emailTemplates', { type }, { subject: 1, html: 1 });
}