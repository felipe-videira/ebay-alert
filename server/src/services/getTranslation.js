const { getOne } = require('./db');

module.exports = async (lng, keys = []) => {
    try {
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

        const locale = await getOne('locales', { lng, deleted: 0 }, fields);

        const translation = (locale || {}).translation;

        return keys.length === 1 ? translation[keys[0]] : translation;

    } catch (err) {
        throw err;
    }
}