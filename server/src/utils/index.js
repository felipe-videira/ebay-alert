module.exports.emailValidation = value => 
    /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);

module.exports.partition = (arr, isValid) => 
    arr.reduce(([pass, fail], o) => isValid(o) ? [[...pass, o], fail] : [pass, [...fail, o]], [[], []]);
  
module.exports.roundUp = num => parseInt(num) + (num % 1 !== 0) 