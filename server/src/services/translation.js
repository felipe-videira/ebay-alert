const { getOne } = require('./db');

module.exports = {
    get: async (db, lng, keys = []) => {
        let fields
        if (keys && !!keys.length) {
            fields = keys.reduce((keysObj, key) => {
                keysObj[`translation.${key}`] = 1;
                return keysObj;
            }, {});
        } else {
            fields = {
                translation: 1
            }
        }
        const { translation } = ((await getOne(db, 'locales', { lng: lng.split('-')[0] }, fields)) || {});
        return keys.length === 1 ? translation[keys[0]] : translation;
    }
}