// require('dotenv').config();

// const knex = require('knex')({
//     client:'postgresql',
//     connection: {
//         database: process.env.DATABASE,
//         user:     process.env.DATABASE_USER,
//         password: process.env.DATABASE_PASSWORD
//     }
// })

// fake seed import
const fakeData = require('./fakeSeed')

class fetchDB {
    constructor(){}

    getBitcoin(){
        // return knex('bitcoin_test')
        return fakeData
    }
}

module.exports = fetchDB