
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

mongoose.plugin(mongoosePaginate);

let db = null;

module.exports = () => {
    if (!db) {
        mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
        db = mongoose.connection;
        db.on('error', (error) => console.error("database error: ", error));
        db.on('disconnected', () => console.log('database disconnected'));
        db.once('open', () => console.log('connected to database'));
        const gracefulExit = () => { 
            db.close(() => {
                console.log('database disconnected through app termination');
                process.exit(0);
            });
        };
        process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);
    } 
    return db;
};
