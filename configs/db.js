const { Pool, Client } = require('pg')
const connectionString = process.env.CONNECTION_STRING;
 
const client = new Client({
    connectionString,
  })

module.exports = client;