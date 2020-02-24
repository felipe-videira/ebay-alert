const frequency = require('../services/frequency');

module.exports = {
    get: async (req, res) => {
        try {
            const data = await frequency.get(req.locals.db);
            res.status(data ? 200 : 404).json(data);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}