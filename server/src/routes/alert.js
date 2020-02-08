
const db = require('../database')();
const Alert = require('../models/alert');
const router = require('express').Router();
const getLang = require('../middlewares/getLang');
const getAlert = require('../middlewares/getAlert');
const getTranslation = require('../services/getTranslation');
const setResponseMessage = require('../middlewares/setResponseMessage');

router.get('/params', getLang, async (req, res) => {
    try {
        const { fields } = await db.collection('formParams')
            .findOne({ 
                form: 'alertForm', deleted: 0 
            }, { 
                fields: { fields: 1 }
            });

        if (!fields) {
            res.status(404).json({});
            return;
        }
        
        const { alertFormParam } = await getTranslation(req.lng, ['alertFormParam'])
        
        if (!alertFormParam) {
            res.status(404).json({});
            return;
        }
        
        for (const field in fields) {
            fields[field].label = alertFormParam[fields[field].label];
            fields[field].placeholder = alertFormParam[fields[field].placeholder];
            if (fields[field].mobileLabel) fields[field].mobileLabel = alertFormParam[fields[field].mobileLabel];
            if (fields[field].rules && !!fields[field].rules.length) {
                fields[field].rules.map(o => o.message = alertFormParam[o.message]);
            }
        }

        res.json(fields);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/', async (req, res) => {
    try {
        let { page = 1, limit = 5 } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        const { docs, total, pages } = await Alert.paginate({ 
            deleted: 0 
        }, {
            page,
            limit,
            select: 'searchPhrase email frequency _id',
        })

        res.json({ 
            data: docs, 
            page, 
            pages, 
            total 
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/:id', getAlert, async (req, res) => {
    const { searchPhrase, email, frequency, id } = res.alert;

    res.json({ searchPhrase, email, frequency, id });
})

router.post('/', setResponseMessage, async (req, res) => {
    try {
        const alert = new Alert(req.body);

        const { _id } = await alert.save();

        res.status(201).json({ 
            message: res.message,
            data: _id 
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.patch('/:id', setResponseMessage, getAlert, async(req, res) => {
    try {
        if (req.body.searchPhrase) 
            res.alert.searchPhrase = req.body.searchPhrase;
        if (req.body.frequency) 
            res.alert.frequency = req.body.frequency;
        if (req.body.email) 
            res.alert.email = req.body.email;

        res.alert.lastModifiedAt = new Date().toISOString();

        const updatedAlert = await res.alert.save();

        res.json({
            message: res.message, 
            data: updatedAlert._id
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.delete('/:id', setResponseMessage, getAlert, async (req, res) => {
    try {
        res.alert.deleted = 1;

        await res.alert.save();

        res.json({ message: res.message });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
