const cors = require('cors');
const jobs = require('./jobs');
const express = require('express');
const routes = require('./routes');
const logging = require('./middlewares/logging');

const PORT = process.env.API_PORT;
const app = express();

require('./database')();

app.use(express.json());
app.use(cors());

app.use('/', logging, routes);

jobs.init();

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}!`);
});

module.exports = app;

    
