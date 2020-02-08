const getTranslation = require('../services/getTranslation')
const router = require('express').Router();

router.get('/:lng', async (req, res) => {
    try {
        const translation = await getTranslation(req.params.lng.split('-')[0]);

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