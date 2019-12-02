const express = require('express');
const app = express();
const routes = require('./routes')
const PORT = process.env.API_PORT;

require('./database')

app.use(express.json())

app.use('/', routes)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}!`);
});

    
