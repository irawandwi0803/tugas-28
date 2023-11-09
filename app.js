const express = require(`express`);
const res = require("express/lib/response");
const req = require("express/lib/request");
const app = express();
const port = 3000;
const contacts = require('./utility/contacts');
const expressLayouts = require('express-ejs-layouts');

// menggunakan ejs
app.set('view engine', 'ejs');
// menggunakan layout
app.use(expressLayouts);
// build-in middleware
app.use(express.static('public'));

app.get('/', (req, res) => {
    // res.sendFile('./index.html', {
    //     root: __dirname
    // });
    res.render('index', {
        tittle: 'Home',
        layout: 'layouts/main-layout',
    });
});

app.get('/about', (req, res) => {
    // res.sendFile('./about.html', { 
    //     root: __dirname
    // });
    res.render('about', {
        tittle: 'About',
        layout: 'layouts/main-layout',
    });
});

app.get('/contact', (req, res) => {
    // res.sendFile('./contact.html', {
    //     root: __dirname
    // });
    
    const contact = contacts.loadContact();
    res.render('contact', { 
        contacts: contact,
        tittle: 'Contact',
        layout: 'layouts/main-layout',
    });
});

app.get('/product/:id', (req,res) => {
    res.send(`Product ID : ${req.params.id} <br> Category : ${req.query.category}`);
});

app.use('/', (req, res) => {
    res.status(404);
    res.send('Page not found');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});