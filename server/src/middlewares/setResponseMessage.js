const getLang = require('./getLang');
const translation = require('../services/translation');

module.exports = async (req, res, next) => {
  try {
    getLang(req, res);
    res.message = (await translation.get(`${req.lng}-client`, [
      `${req.originalUrl.split('/')[1]}_${req.method.toLowerCase()}`
    ]) || '');
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}