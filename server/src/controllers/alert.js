
const alert = require('../services/alert');

module.exports = {
    get: async (req, res) => {
        try {
            const data = await alert.get(req.locals.db, req.query);
            res.status(data ? 200 : 404).json(data);
        } catch (err) {
            res.status(500).json({ message: err.message });            
        }
    },
    getById: (req, res) => {
        try {
            res.status(200).json(alert.getById(res.alert));
        } catch (err) {
            res.status(500).json({ message: err.message });            
        }
    },
    getParams: async (req, res) => {
        try {
            const data = await alert.getParams(req.locals.db, lng);
            res.status(data ? 200 : 404).json(data);
        } catch (err) {
            res.status(500).json({ message: err.message });            
        }
    },
    post: async (req, res) => {
        try {
            const data = await alert.save(req.locals.db, req.body, );
            res.status(data ? 201 : 400).json({ message: data && res.message, data });
        } catch (err) {
            res.status(500).json({ message: err.message });            
        }
    },
    patch: async (req, res) => {
        try {
            await alert.update(req.locals.db, req.body, res.alert);
            res.status(200).json({ message: res.message });
        } catch (err) {
            res.status(500).json({ message: err.message });            
        }
    },
    delete: async (req, res) => {
        try {
            await alert.delete(req.locals.db, res.alert);
            res.status(200).json({ message: res.message });
        } catch (err) {
            res.status(500).json({ message: err.message });            
        }
    }
}
