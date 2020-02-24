const translation = require('../services/translation')

module.exports = {
    get: async (req, res) => {
        try {
            const data = await translation.get(req.locals.db, req.params.lng);
            res.status(data ? 200 : 404).json(data);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}