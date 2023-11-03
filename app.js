const express = require(`express`);
const res = require("express/lib/response");
const req = require("express/lib/request");
const app = express();
const port = 3000;
const contacts = require('./utility/contacts')

// menggunakan ejs
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // res.sendFile('./index.html', {
    //     root: __dirname
    // });
    res.render('index');
});

app.get('/about', (req, res) => {
    // res.sendFile('./about.html', { 
    //     root: __dirname
    // });
    res.render('about');
});

app.get('/contact', (req, res) => {
    // res.sendFile('./contact.html', {
    //     root: __dirname
    // });
    
    const contact = [
        {
            nama: 'awan',
            noTelp: '087774529635',
            email: 'awan@gmail.com'
        },
        {
            nama: 'irawan',
            noTelp: '085775732075',
            email: 'irawan@gmail.com'
        },
        {
            nama: 'dwi',
            noTelp: '085693673537',
            email: 'dwi@gmail.com'
        }
    ]
    res.render('contact', { 
        contact
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