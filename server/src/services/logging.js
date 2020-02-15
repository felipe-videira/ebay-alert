const winston = require('winston');
require('winston-mongodb');

const dbConfig = {
    db: process.env.DB_URL,
    collection: 'log',
    options: { useNewUrlParser: true }
};

const logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    transports: [
      new winston.transports.MongoDB({ ...dbConfig, level: 'error' }),
      new winston.transports.MongoDB({ ...dbConfig, level: 'warn' }),
      new winston.transports.MongoDB({ ...dbConfig, level: 'info' }),

      new winston.transports.File({ filename: 'verbose.log', level: 'verbose' }),
      new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
      new winston.transports.File({ filename: 'silly.log', level: 'silly' }),
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

module.exports = logger;
