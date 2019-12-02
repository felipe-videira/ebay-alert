const Alert = require('../models/alert')

module.exports = async (req, res, next) => {
    try {
        const alert = await Alert.findById(req.params.id)
        if (alert == null) {
            return res.status(404).json({ message: 'Cant find alert'})
        }
        res.alert = alert
        next()
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
  }