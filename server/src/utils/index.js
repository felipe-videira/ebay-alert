module.exports.FREQUENCY_TYPES = [2, 10, 30]

module.exports.emailValidation = v => 
    /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v)