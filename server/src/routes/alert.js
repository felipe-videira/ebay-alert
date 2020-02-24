
const router = require('express').Router();
const alert = require('../controllers/alert');
const getLang = require('../middlewares/getLang');
const getAlert = require('../middlewares/getAlert');
const setResponseMessage = require('../middlewares/setResponseMessage');

router.get('/', alert.get);
router.get('/:id', getAlert, alert.getById);
router.get('/params', getLang, alert.getParams);
router.post('/', setResponseMessage, alert.post);
router.patch('/:id', setResponseMessage, getAlert, alert.patch);
router.delete('/:id', setResponseMessage, getAlert, alert.delete);

module.exports = router;
