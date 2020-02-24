const router = require('express').Router();
const frequency = require('../controllers/frequency');

router.get('/', frequency.get)

module.exports = router;