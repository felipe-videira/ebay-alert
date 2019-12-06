
const Alert = require('../models/alert');
const router = require('express').Router();
const getAlert = require('../middlewares/getAlert');

router.get('/', async (req, res) => {
    try {
        const alerts = await Alert.find({ 
            deleted: 0 
        }, { 
            searchPhrase: 1, 
            email: 1, 
            frequency: 1, 
            _id: 1 
        });

        res.json(alerts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/:id', getAlert, async (req, res) => {
    const { searchPhrase, email, frequency, id } = res.alert;

    res.json({ searchPhrase, email, frequency, id });
})

router.post('/', async (req, res) => {
    try {
        const alert = new Alert(req.body);

        const newAlert = await alert.save();

        res.status(201).json(newAlert._id);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.patch('/:id', getAlert, async(req, res) => {
    try {
        if (req.body.searchPhrase) 
            res.alert.searchPhrase = req.body.searchPhrase;
        if (req.body.frequency) 
            res.alert.frequency = req.body.frequency;
        if (req.body.email) 
            res.alert.email = req.body.email;

        res.alert.lastModifiedAt = new Date().toISOString();

        const updatedAlert = await res.alert.save();

        res.json(updatedAlert._id);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.delete('/:id', getAlert, async (req, res) => {
    try {
        res.alert.deleted = 1;

        await res.alert.save();

        res.json({ message: 'Alert successfully deleted.' });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
