const getLang = require('./getLang');
const Alert = require('../models/alert');
const { getById } = require('../services/db');
const getTranslation = require('../services/getTranslation');

module.exports = async (req, res, next) => {
  try {
    const alert = await getById(Alert, req.params.id);
 
    if (!alert) {
      getLang(req, res);

      const message = await getTranslation(`${req.lng}-client`, ['alert_get_404']);

      return res.status(404).json({ message });
    }

    res.alert = alert;

    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}