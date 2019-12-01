const express = require('express');
const app = express();

const PORT = process.env.API_PORT;

app.get('/', (req, res) => {
    res.send('Hi there!');
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}!`);
});

    
