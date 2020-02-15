const logger = require('../services/logging');

module.exports = async (req, res, next) => {
    try {
        logger.log('info', {
            url: req.originalUrl,
            method: req.method,
            body: req.body,
            params: req.params,
            query: req.query,
            headersReceived: req.headers,
            headersSent: res.headersSent,
        });
    } catch (err) {
        console.error("logging middleware error:", err);
    } finally {
        next();
    }
}