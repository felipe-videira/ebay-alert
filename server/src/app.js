const cors = require('cors');
const express = require('express');
const routes = require('./routes');
const dbMiddleware = require('./middlewares/db');
const logMiddleware = require('./middlewares/log');

const app = express();
const db = require('./database')();
const PORT = process.env.API_PORT;

app.use(cors());
app.use(express.json());
app.use('/', dbMiddleware(db), logMiddleware, routes);

if (process.env.NODE_ENV !== 'test') {
    require('./jobs').init(db);
}

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}!`);
});

module.exports = app;

    
