module.exports.emailValidation = value => 
    /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value)