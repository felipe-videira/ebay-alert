
const Alert = require('../models/alert');
const dbService = require('../services/db');
const translation = require('../services/translation');

module.exports = {
    get: async (db, query) => {
        let { page = 1, limit = 5 } = query;
        page = parseInt(page);
        limit = parseInt(limit);
        const { 
            docs, 
            total, 
            pages 
        } = await dbService.paginate(db, Alert, { 
            deleted: 0 
        }, {
            page,
            limit,
            select: 'searchPhrase email frequency _id',
        });
        return { data: docs, page, pages, total };
    },
    getById: alert => {
        const { searchPhrase, email, frequency, id } = alert;
        return { searchPhrase, email, frequency, id };
    },
    getParams: async (db, lng) => {
        const { fields } = await dbService.getOne('formParams', { 
            form: 'alertForm', 
        }, { 
            fields: { fields: 1 } 
        });
        if (!fields) return;
        const alertFormParam = await translation.get(db, lng, ['alertFormParam'])
        if (!alertFormParam) return;
        for (const field in fields) {
            fields[field].label = alertFormParam[fields[field].label];
            fields[field].placeholder = alertFormParam[fields[field].placeholder];
            if (fields[field].mobileLabel) {
                fields[field].mobileLabel = alertFormParam[fields[field].mobileLabel];
            }
            if (fields[field].rules && !!fields[field].rules.length) {
                fields[field].rules.map(o => o.message = alertFormParam[o.message]);
            }
        }
        return fields;
    },
    save: async (db, body) => {
        const { _id } = await dbService.save(db, Alert, body);
        return _id;
    },
    update: (db, body, alert) => {
        const { searchPhrase, frequency, email } = body;
        if (searchPhrase) alert.searchPhrase = searchPhrase;
        if (frequency) alert.frequency = frequency;
        if (email) alert.email = email;
        return dbService.updateOne(db, alert);
    },
    delete: (db, alert) => {
        return dbService.deleteOne(db, alert);
    }
}

