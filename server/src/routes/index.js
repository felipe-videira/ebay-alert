const router = require('express').Router();

const alertRouter = require('./alert');
const frequencyRouter = require('./frequency');
const localeRouter = require('./locale');


router.use('/alert', alertRouter);
router.use('/frequency', frequencyRouter);
router.use('/locale', localeRouter);

router.get('/', (req, res) => res.send("Ebay Alert API v1.0"));

module.exports = router;