const Email = require('../models/email');

module.exports = async (subject, html, to, frequency) => {
    return new Email({ 
        subject,
        html,
        to,
        from: 'Ebay Alert <do-not-reply@ebayalert.com>',
        frequency: frequency.value
    }).save();
}