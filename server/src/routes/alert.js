
const router = require('express').Router();
const Alert = require('../models/alert');

const db = require('../services/db');
const getTranslation = require('../services/getTranslation');

const getLang = require('../middlewares/getLang');
const getAlert = require('../middlewares/getAlert');
const setResponseMessage = require('../middlewares/setResponseMessage');


router.get('/params', getLang, async (req, res) => {
    try {
        const { fields } = await db.getOne('formParams', { 
            form: 'alertForm', 
            deleted: 0 
        }, { 
            fields: 1 
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

        const { docs, total, pages } = await db.paginate(Alert, { 
            deleted: 0 
        }, {
            page,
            limit,
            select: 'searchPhrase email frequency _id',
        });

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
        const { _id } = await db.save(Alert, req.body);

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
        const { searchPhrase, frequency, email } = req.body;
        const { alert } = res;

        if (searchPhrase) alert.searchPhrase = searchPhrase;
        if (frequency) alert.frequency = frequency;
        if (email) alert.email = email;

        const updatedAlert = await db.updateOne(alert);

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
        await db.deleteOne(alert);

        res.json({ message: res.message });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
