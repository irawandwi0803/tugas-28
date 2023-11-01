const express = require(`express`);
const res = require("express/lib/response");
const req = require("express/lib/request");
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile('./index.html', {
        root: __dirname
    });
});

app.get('/about', (req, res) => {
    res.sendFile('./about.html', { 
        root: __dirname
    });
});

app.get('/contact', (req, res) => {
    res.sendFile('./contact.html', {
        root: __dirname
    });
});

app.get('/product/:id', (req,res) => {
    res.send(`Product ID : ${req.params.id} <br> Category ID : ${req.query.category}`);
});

app.use('/', (req, res) => {
    res.status(404);
    res.send('Page not found');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});