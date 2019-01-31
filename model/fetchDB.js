require('dotenv').config({path : __dirname+'/../.env'});
const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: process.env.DATABASE,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD
    }
})

// fake seed import
const fakeData = require('../utils/fakeSeed')

class fetchDB {
    // User Profile
    createUserProfile(uid, payload){
        let {photourl, displayname} = payload
        if(photourl !== undefined && displayname !== undefined){
            return knex.transaction((trx)=> {
                trx('user_profile')
                    .insert({
                        photourl,
                        displayname,
                        uid
                    })
                    .then(trx.commit)
                    .catch(trx.rollback)
            }).then(()=> knex('user_profile').where('uid', uid))
        }else{
            return Promise.reject(new Error('payload missing'))
        }
    }
    getUserProfile(uid){
        return knex('user_profile').where('uid', uid)
            .catch(err => Promise.reject(new Error('No Such User')))
    }
    // Chart Data Section
    getCoinHistory(coin) {
        // return knex(coin)
        return fakeData
    }

    dailyUpdate(coin, payload) {
        let { date, price, txVol, marketCap } = payload
        if (price !== undefined && txVol !== undefined && marketCap !== undefined) {
            return knex.transaction(trx => {
                trx(`${coin}`)
                    .insert({
                        date,
                        price,
                        txVol,
                        marketCap
                    })
                    .returning('id')
                    .then(trx.commit)
                    .catch(trx.rollback)
            })
            .then((id) => knex(`${coin}`).where('id', ...id))
        } else {
            return Promise.reject(new Error('Payload missing'))
        }
    }

    // Wallet Section
    createWallet(uid, payload) {
        let { rest } = payload
        if (rest !== undefined) {
            return knex.transaction(trx => {
                trx('wallet')
                    .insert({
                        rest,
                        uid
                    })
                    .then(trx.commit)
                    .catch(trx.rollback)
            }).then(() => knex('wallet').where('uid', uid))
        } else {
            return Promise.reject(new Error('Payload missing'))
        }
    }

    getWallet(uid) {
        return knex('wallet').where('uid', uid)
            .then(reply => {
                if(reply[0] === undefined){
                    return this.createWallet(uid, {rest : 100000000})
                }else{
                    return reply
                }
            })
    }

    updateWallet(uid, payload) {
        let { coins, rest } = payload
        if (coins !== undefined && rest !== undefined) {
            return knex.transaction(trx => {
                trx('wallet')
                    .update({
                        coins: JSON.stringify(coins),
                        rest
                    })
                    .where('uid', uid)
                    .then(trx.commit)
                    .catch(trx.rollback)
            }).then(() => knex('wallet').where('uid', uid))
        } else {
            return Promise.reject(new Error('Payload missing'))
        }
    }

    dailyUpdateWallet(uid, payload) {
        let { dailyPL } = payload
        if (dailyPL !== undefined) {
            return knex.transaction(trx => {
                trx('wallet')
                    .update({
                        dailyPL: JSON.stringify(dailyPL)
                    })
                    .where('uid', uid)
                    .then(trx.commit)
                    .catch(trx.rollback)
            }).then(() => knex('wallet').where('uid', uid))
        } else {
            return Promise.reject(new Error('Payload missing'))
        }
    }

    // trade-history
    getTradeHistory(uid) {
        return knex('trade_history').where('uid', uid)
    }

    insertTradeHistory(uid, payload) {
        let { action } = payload
        if (action !== undefined) {
            return knex.transaction(trx => {
                trx('trade_history')
                    .insert({
                        action: JSON.stringify(action),
                        uid
                    })
                    .where('uid', uid)
                    .then(trx.commit)
                    .catch(trx.rollback)
            }).then(() => knex('trade_history').where('uid', uid))
        } else {
            return Promise.reject(new Error('Payload missing'))
        }
    }

    // Comment Section
    async getAllComments(tag) {
        let comments = await knex('comment').where('tag', tag).orderBy('id', 'desc')
        let output = comments.map(async(comment) => {
            const query = await knex('user_profile').where('uid', comment.uid)
            const {displayname, photourl} = query[0]
            return {
                date : comment.date,
                context : comment.context,
                tag : comment.tag,
                displayName : displayname,
                photoURL : photourl
            }
        })
        return await Promise.all(output)
    }

    async getUserComments(uid) {
        return {
            comments : await knex('comment').where('uid', uid).orderBy('id', 'desc'),
            profile : await knex('user_profile').where('uid', uid)
        }
    }

    addComments(uid, payload) {
        let { context, tag } = payload
        if (context !== undefined && tag !== undefined) {
            return knex.transaction(trx => {
                trx('comment')
                    .insert({
                        uid,
                        context,
                        tag
                    })
                    .where('uid', uid)
                    .then(trx.commit)
                    .catch(trx.rollback)
            }).then(() => knex('comment').where('uid', uid))
        } else {
            return Promise.reject(new Error('Payload missing'))
        }
    }
}
let a = new fetchDB()
// a.createWallet('test1', {rest: 1000}).then(console.log)
// a.getWallet('test1').then(console.log)
// a.updateWallet('test1', {coins: [['BTC' ,49],["ETH", 500]], rest:7500}).then(console.log).catch(err => console.error(err))
// a.dailyUpdateWallet('test1', {dailyPL: [17640]}).then(console.log).catch(err => console.error(err))

// a.insertTradeHistory('test1', {action : ['BTC','buy', 13, 3750]}).then(console.log).catch(err => console.error(err))
// a.getTradeHistory('test1').then(console.log)

// a.addComments('test1',{ context: 'From DB', tag: 'BTC'}).then(console.log)
// a.getUserComments('test1').then(console.log)
// a.getAllComments('BTC').then(console.log)

// a.getUserProfile('test1').then(console.log)

// a.dailyUpdate('bitcoin',{ date:"2009-01-03",price:0,txVol:0,marketCap:0}).then(console.log).catch(err=>console.error(err))

module.exports = fetchDB