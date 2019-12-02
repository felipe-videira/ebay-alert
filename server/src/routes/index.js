const router = require('express').Router();
const alertRouter = require('./alert');


router.use('/alert', alertRouter)


module.exports = router