const router = require('express').Router();
const getFrequencies = require('../services/getFrequencies');

router.get('/', async (req, res) => {
    try {
        res.json(await getFrequencies());
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;