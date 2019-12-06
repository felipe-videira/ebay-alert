const mongoose = require('mongoose');
const Alert = require('../models/alert');

module.exports = async (req, res, next) => {
  try {
    const alert = await Alert.findOne({
      _id: mongoose.Types.ObjectId(req.params.id), 
      deleted: 0,  
    });
    
    if (!alert) return res.status(404).json({ message: 'Cant find alert'});

    res.alert = alert;

    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}