const fs = require(`fs`);

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
const loadContact = () => {
    const file = fs.readFileSync(dataPath, `utf-8`);
    const contacts = JSON.parse(file);
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


module.exports = { loadContact, findContact, addContact }