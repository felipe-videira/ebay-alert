const router = require('express').Router();
const { version } = require('../../package.json')

router.use('/alert', require('./alert'));
router.use('/frequency', require('./frequency'));
router.use('/locale', require('./locale'));

router.get('/', (req, res) => res.send(`Ebay Alert API v${version}`));

module.exports = router;