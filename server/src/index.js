const jobs = require('./jobs');
const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const PORT = process.env.API_PORT;
const app = express();

require('./database');
require('../mock');

app.use(express.json());
app.use(cors());

app.use('/', routes);

jobs.init();

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}!`);
});

    
