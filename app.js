const express = require(`express`);
const res = require("express/lib/response");
const req = require("express/lib/request");
const app = express();
const port = 3000;
const {loadContact, findContact, addContact} = require('./utility/contacts');
const expressLayouts = require('express-ejs-layouts');

// menggunakan ejs
app.set('view engine', 'ejs');
// third party middleware
app.use(expressLayouts);
// build-in middleware
app.use(express.static('public'));
app.use(express.urlencoded());

// halaman home
app.get('/', (req, res) => {
    // res.sendFile('./index.html', {
    //     root: __dirname
    // });
    res.render('index', {
        tittle: 'Home',
        layout: 'layouts/main-layout',
    });
});

// halaman about
app.get('/about', (req, res) => {
    // res.sendFile('./about.html', { 
    //     root: __dirname
    // });
    res.render('about', {
        tittle: 'About',
        layout: 'layouts/main-layout',
    });
});

// halaman contact
app.get('/contact', (req, res) => {
    // res.sendFile('./contact.html', {
    //     root: __dirname
    // });
    
    const contacts = loadContact();
    res.render('contact', { 
        contacts,
        tittle: 'Contact',
        layout: 'layouts/main-layout',
    });
});

// halaman form add contact
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        tittle: 'Form Tambah Data Contact',
        layout: 'layouts/main-layout'
    })
})

// proses data contact
app.post('/contact', (req, res) => {
    addContact(req.body);
    res.redirect('/contact')
})

// halaman detail contact
app.get('/contact/:nama', (req, res) => {    
    const contact = findContact(req.params.nama);
    res.render('detail', { 
        contact,
        tittle: 'Halaman Detail Contact',
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