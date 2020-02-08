const db = require('../database')();

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

        const locale = await db.collection('locales').findOne({ lng, deleted: 0 }, fields);

        return (locale || {}).translation;

    } catch (err) {
        throw err;
    }
}