const Frequency = require('./src/models/frequency')

Frequency.exists().then(exists => {
    if (!exists) {
        Frequency.insertMany([
            {
                value: '2',
                label: '2',
            },  
            {
                value: '10',
                label: '10',
            },  
            {
                value: '30',
                label: '30',
            },  
        ]);
    } 
});


