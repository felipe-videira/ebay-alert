const log = require('../services/log');

module.exports = async (req, res, next) => {
    try {
        log.info({ 
            message: 'request',
            meta: {
                url: req.originalUrl,
                method: req.method,
                body: req.body,
                params: req.params,
                query: req.query,
                headersReceived: req.headers,
                headersSent: res.headersSent,
            }
        });
    } catch (err) {
        console.error("logging middleware error:", err);
    } finally {
        next();
    }
}