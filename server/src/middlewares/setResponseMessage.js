const getLang = require('./getLang');
const getTranslation = require('../services/getTranslation');

module.exports = async (req, res, next) => {
  try {
    getLang(req, res);
    
    const message = await getTranslation(`${req.lng}-client`, [
      `${req.originalUrl.split('/')[1]}_${req.method.toLowerCase()}`
    ]);

    if (message) res.message = message;

    next();
    
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}