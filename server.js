const { syncAndSeed, models: { Dessert, Location } } = require('./db');
const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/locations', async(req, res, next) =>  {
    try {
        res.send(await Location.findAll({
            include: [ Dessert ]
        }));
    }
    catch(err) {
        next(err);
    }
});

/*
app.get('/api/locations/:id', async(req, res, next) => {
    try {
        res.send(await Location.findByPk(req.params.id, {
            include: [ Dessert ]
        }));
    }
    catch(err) {
        next(err);
    }
});
*/

const setup = async() =>  {
    try {
        await syncAndSeed();
        
        const port = process.env.PORT || 8080;
        app.listen(port, () => console.log(`listening on port ${port}`));
    }
    catch(err) {
        console.log(err)
    }
};

setup();