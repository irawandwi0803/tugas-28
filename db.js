const Pool = require('pg').Pool

const pool = new Pool ({
    user: "postgres",
    password: "dwiirawan123",
    database: "contacts",
    host: "localhost",
    port: "5432"
})

module.exports = pool