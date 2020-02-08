const getLang = require('./getLang');
const getTranslation = require('../services/getTranslation');

module.exports = async (req, res, next) => {
  try {
    getLang(req, res);
    
    const translationKey = `${req.originalUrl.split('/')[1]}_${req.method.toLowerCase()}`;

    const translation = await getTranslation(`${req.lng}-client`, [translationKey]);

    !translation && next();

    res.message = translation[translationKey];

    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}