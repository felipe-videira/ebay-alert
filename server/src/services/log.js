const winston = require('winston');

require('winston-mongodb');

const dbConfig = {
    db: process.env.DB_URL,
    collection: 'logs',
    options: { useNewUrlParser: true }
};

const formatter = log => {
    if (log.meta) {
        log.message = `${log.message}: ${JSON.stringify(log.meta)}`;
    }
    return log;
}

const logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    format: winston.format(formatter)(),
    transports: [
        ...process.env.NODE_ENV !== 'production' ? [
            new winston.transports.Console({ format: winston.format.simple() })
        ] : [],
        ...process.env.NODE_ENV !== 'test' ? [
            new winston.transports.MongoDB({ ...dbConfig, level: 'error' }),
            new winston.transports.MongoDB({ ...dbConfig, level: 'warn' }),
            new winston.transports.MongoDB({ ...dbConfig, level: 'info' }),
      
            new winston.transports.File({ filename: 'verbose.log', level: 'verbose' }),
            new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
            new winston.transports.File({ filename: 'silly.log', level: 'silly' }),
        ] : []
    ]
});

module.exports = logger;
