const cors = require('cors');
const jobs = require('./jobs');
const express = require('express');
const routes = require('./routes');
const logger = require('./middlewares/logger');

const PORT = process.env.API_PORT;
const app = express();

require('./database')();

app.use(express.json());
app.use(cors());

app.use('/', logger, routes);

if (process.env.NODE_ENV !== 'test') {
    jobs.init();
}

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}!`);
});

module.exports = app;

    
