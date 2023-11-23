const fs = require(`fs`);
const pool = require('../db')


// cek dan membuat folder jika tidak ada
const dirPath = `./data`;
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
};

// cek dan membuat file data kontak jika tidak ada
const dataPath = `data/contacts.json`;
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, `[]`, `utf-8`)
};

// load kontak
const loadContact = async () => {

    const conn = await pool.connect();
    const query = `SELECT * FROM tbl_contact`;
    const result = await conn.query(query);
    const contacts = result.rows;
    // const file = fs.readFileSync(dataPath, `utf-8`);
    // const contacts = JSON.parse(file);
    return contacts;
};

// cari kontak berdasarkan nama
const findContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama === nama);
    return contact;
};

// menuliskan file contacts.json dengan data baru
const saveContacts = (contacts) => {
    fs.writeFileSync(dataPath, JSON.stringify(contacts))
};

// menambahkan contact baru
const addContact = (contact) => {
    const contacts = loadContact();
    contacts.push(contact);
    saveContacts(contacts);
};

// cek duplikat nama
const cekDuplikat = (nama) => {
    const contacts = loadContact();
    return contacts.find((contact) => contact.nama === nama);
}

// delete contact
const deleteContact = async (nama) => {
    const contacts = await loadContact();
    const filterContacts = contacts.filter(
        (contact) => contact.nama !== nama
    );
    saveContacts(filterContacts);
}

// update contact
const updateContacts = (newContacts) => {
    const contacts = loadContact();
    // menghilangkan data contact lama yang namanya sama dengan oldname
    const filterContacts = contacts.filter(
        (contact) => contact.nama !== newContacts.oldNama);
    delete newContacts.oldNama;
    filterContacts.push(newContacts);
    saveContacts(filterContacts);
}

module.exports = { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts }