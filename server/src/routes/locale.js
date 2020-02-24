const router = require('express').Router();
const locale = require('../controllers/locale');

router.get('/:lng', locale.get)

module.exports = router;