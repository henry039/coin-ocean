require('dotenv').config({ path: __dirname + '/../.env' });
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
    createUserProfile(uid, payload) {
        let { photourl, displayname, email } = payload
        if (photourl !== undefined && displayname !== undefined) {
            return knex.transaction((trx) => {
                trx('user_profile')
                    .insert({
                        photourl,
                        displayname,
                        uid,
                        email
                    })
                    .then(trx.commit)
                    .catch(trx.rollback)
            }).then(() => knex('user_profile').where('uid', uid))
        } else {
            return Promise.reject(new Error('payload missing'))
        }
    }
    getUserProfile(uid) {
        return knex('user_profile').where('uid', uid)
            .catch(err => Promise.reject(new Error('No Such User')))
    }

    // subscribe & reminder
    getSubscribeCoin(uid){
        return knex('user_profile').where('uid', uid).select('subscribe')
            .catch(err => Promise.reject(new Error('No Such User')))
    }

    updateSubscribeCoin(uid, coinList) {
        return knex.transaction(trx => {
            trx('user_profile')
                .update({
                    subscribe: JSON.stringify(coinList)
                })
                .where('uid', uid)
                .then(trx.commit)
                .catch(trx.rollback)
        }).then(() => knex('user_profile').select('subscribe').where('uid', uid))
    }

    getReminder(uid){
        return knex('user_profile').where('uid', uid).select('reminder')
    }

    updateReminder(uid, remind) {
        return knex.transaction(trx => {
            trx('user_profile')
                .update({
                    reminder: JSON.stringify(remind)
                })
                .where('uid', uid)
                .then(trx.commit)
                .catch(trx.rollback)
        }).then(() => knex('user_profile').select('reminder').where('uid', uid))
    }
    // Chart Data Section
    // getCoinHistory(coin) {
    //     // return knex(coin)
    //     return fakeData
    // }

    // Wallet Section
    createWallet(uid, payload) {
        let { rest, dailyPL } = payload
        const dailyPL2 = JSON.stringify(dailyPL)
        if (rest !== undefined && dailyPL !== undefined) {
            return knex.transaction(trx => {
                trx('wallet')
                    .insert({
                        rest,
                        uid,
                        dailyPL : dailyPL2
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
                if (reply[0] === undefined) {
                    return this.createWallet(uid, { rest: 1000000 , dailyPL: [1000000]})
                } else {
                    return reply
                }
            })
    }

    getAllWallet(){
        return knex('wallet')
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

    dailyUpdateWallet(uid, dailyPL) {
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
        let output = comments.map(async (comment) => {
            const query = await knex('user_profile').where('uid', comment.uid)
            const { displayname, photourl } = query[0]
            return {
                date: comment.date,
                context: comment.context,
                tag: comment.tag,
                displayName: displayname,
                photoURL: photourl
            }
        })
        return await Promise.all(output)
    }

    getUserComments(uid) {
        return knex('comment').where('uid', uid).orderBy('id', 'desc')
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
            }).then(() => this.getAllComments(tag))
        } else {
            return Promise.reject(new Error('Payload missing'))
        }
    }
}
let a = new fetchDB()
// a.getAllWallet().then(console.log)
// a.getWallet('test2').then(console.log)
// a.updateWallet('test1', {coins: [['BTC' ,49],["ETH", 500]], rest:7500}).then(console.log).catch(err => console.error(err))
// a.dailyUpdateWallet('test2', [100000000]).then(console.log).catch(err => console.error(err))

// a.insertTradeHistory('test1', {action : ['BTC','buy', 13, 3750]}).then(console.log).catch(err => console.error(err))
// a.getTradeHistory('test1').then(console.log)

// a.addComments('test1',{ context: 'From DB', tag: 'BTC'}).then(console.log)
// a.getUserComments('test1').then(console.log)
// a.getAllComments('BTC').then(console.log)

// a.getUserProfile('test1').then(console.log)
// a.createUserProfile('test1', {photourl : 'https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png', displayname: 'jojo chan', email: 'jojo@gmail.com'})
// a.updateSubscribeCoin('test1', ['ETH', 'BTC']).then(console.log)
// a.updateReminder('test1', [['BTC', 'sell', 4100]]).then(console.log)
// a.getReminder('test1').then(console.log)
// a.getSubscribeCoin('test1').then(console.log)

module.exports = fetchDB