module.exports = db => async (req, res, next) => {
    try {
        if (!req.locals) 
            req.locals = {};
        if (!req.locals.db) 
            req.locals.db = db;
        next();
    } catch (err) {
        console.error("db middleware error:", err);
    }
}