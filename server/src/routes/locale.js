const router = require('express').Router();
const db = require('../database')();

router.get('/:lng', async (req, res) => {
    try {
        const { translation } = await db.collection('locales')
            .findOne({ 
                lng: req.params.lng, 
                deleted: 0 
            }, {
                translation: 1
            });

        if (!translation) {
            res.status(404).json({});
            return;
        }

        res.json(translation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;