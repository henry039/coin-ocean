require('dotenv').config();
const minuteData = require('./dailyUpdate/10minutesStore')
const knex = require('knex')({
    client:'postgresql',
    connection: {
        database: process.env.DATABASE,
        user:     process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD
    }
})


// fake seed import
// const fakeData = require('../utils/fakeSeed')

class fetchDB {
    constructor(){}

    getCoinHistory(coin){
        return knex(coin)
        // return fakeData
    }

    getCoinMinute(coin){
        return minuteData(coin).then(data => data)
    }

    dailyUpdate(coin, payload){
        return knex.transaction(async (trx)=>{
            trx(coin).insert({
                date: payload.date,
                price: payload.price,
                txVol: payload.txVol,
                marketCap: payload.marketCap,
            })
        })
    }
}

module.exports = fetchDB