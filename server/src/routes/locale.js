const router = require('express').Router();
const Locale = require('../models/locale');

router.get('/:lng', async (req, res) => {
    try {
        const locale = await Locale.findOne({ 
            lng: req.params.lng, 
            deleted: 0 
        });
        if (!locale) {
            res.status(404).json({});
            return;
        }
        res.json(locale.translation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;