const {Client} = require('pg');

const configuration = new Client({
    host: process.env.POSTGRES_HOST,
    user: 'postgres',
    port: 5433,
    password: '12345',
    database: 'postgres'

});
configuration.connect()
    .then(() => console.log('Connected!'))
    .catch(err => console.error('Connection error', err.stack));

module.exports = configuration;