const express = require(`express`);
const res = require("express/lib/response");
const req = require("express/lib/request");
const app = express();
const port = 3000;
const {loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts} = require('./utility/contacts');
const expressLayouts = require('express-ejs-layouts');
const {body, validationResult, check} = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');


// menggunakan ejs
app.set('view engine', 'ejs');
// third party middleware
app.use(expressLayouts);
// build-in middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

// config flash
app.use(cookieParser('secret'));
app.use(session ({
    cookie: {maxAge: 6000},
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
})
);

app.use(flash());

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
        msg: req.flash('msg')
    });
});

// halaman form add contact
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        tittle: 'Form Tambah Data Contact',
        layout: 'layouts/main-layout'
    })
})

// proses add data contact
app.post('/contact',[
    body('nama').custom((value) => {    // cek duplikat nama
        const duplikat = cekDuplikat(value);
        if (duplikat) {
            throw new Error('Nama Sudah Digunakan!'); // menambahkan error command
        }
        return true;
    }),
    check('email', 'Email Tidak Valid!!!').isEmail(), // validator email
    check('noTelp', 'Nomor Telp Tidak Valid!!!').isMobilePhone('id-ID') // validator no telp
], (req, res) => {
    const errors = validationResult(req);
    // mengirimkan error ke form
    if (!errors.isEmpty()) {        
        res.render('add-contact', {
            tittle: 'Form Tambah Data Contact',
            layout: 'layouts/main-layout',
            errors: errors.array()
        })
    } else {
        addContact(req.body);
        req.flash('msg', 'Data Contact Berhasil Ditambahkan!')
        res.redirect('/contact')
    }
})

// delete contact
app.get('/contact/delete/:nama', (req, res) => {
    // cek kontak di dalam file json berdasarkan nama
    const contact = findContact(req.params.nama);
    // jika contact tidak ada
    if (!contact) {
        res.status(404);
        res.send('Data Tidak Ada')
    } else {
        deleteContact(req.params.nama);
        req.flash('msg', 'Data Contact Berhasil Dihapus!')
        res.redirect('/contact');
    }
        
})

// form ubah data contact
app.get('/contact/edit/:nama', (req, res) => {
    const contact = findContact(req.params.nama);

    res.render('edit-contact', {
        tittle: 'Form Edit Data Contact',
        layout: 'layouts/main-layout',
        contact
    })
})

// proses ubah data contact
app.post('/contact/update', [
    body('nama').custom((value, {req}) => {    // cek duplikat nama
        const duplikat = cekDuplikat(value);
        if (value !== req.body.oldNama && duplikat) {
            throw new Error('Nama Sudah Digunakan!'); // menambahkan error command
        }
        return true;
    }),
    check('email', 'Email Tidak Valid!!!').isEmail(), // validator email
    check('noTelp', 'Nomor Telp Tidak Valid!!!').isMobilePhone('id-ID') // validator no telp
], (req, res) => {
    const errors = validationResult(req);
    // mengirimkan error ke form
    if (!errors.isEmpty()) {        
        res.render('edit-contact', {
            tittle: 'Form Edit Data Contact',
            layout: 'layouts/main-layout',
            errors: errors.array(),
            contact: req.body,
        });
    } else {
        updateContacts(req.body)
        req.flash('msg', 'Data Contact Berhasil Diubah!')
        res.redirect('/contact')
    }
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