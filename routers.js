const fetchDB = require('./model/fetchDB')
const db = new fetchDB()
// const axios = require('axios')

module.exports = (app) => {
    app.get('/api/history/:coin', async (req, res) => {
        let coinHistory = await db.getCoinHistory(req.params.coin)
        res.send(coinHistory)
    })
    // app.get('/api/realtime/:coin', async (req, res) => {
    //     // let coinRealtime = await db.getCoinMinute(req.params.coin)
    //     let realTimeData = await db.getRealTimeCoin()()
    //     res.send(realTimeData)
    // })

    // Wallet
    // app.post('/api/create/wallet', async (req, res) => {
    //     let newWallet = await db.createWallet(req.body.uid, req.body.payload);
    //     res.send(newWallet)
    // })

    app.post('/api/get/wallet', async (req, res) => {
        let walletDetail = await db.getWallet(req.body.uid)
        res.send(formatWalletOutput(walletDetail))
    })

    app.post('/api/update/wallet', async (req, res) => {
        let updatedWallet = await db.updateWallet(req.body.uid, req.body.payload)
        res.send(formatWalletOutput(updatedWallet))
    })

    // trade-history
    app.post('/api/get/trade-history', async (req, res) => {
        let history = await db.getTradeHistory(req.body.uid)
        res.send(formatTradeOutput(history))
    })

    app.post('/api/add/trade-history', async (req, res) => {
        let history = await db.insertTradeHistory(req.body.uid, req.body.payload)
        res.send(formatTradeOutput(history))
    })

    // Comment
    app.get('/api/allComments/:coin', async (req, res) => {
        let comments = await db.getAllComments(req.params.coin)
        res.send(allCommentsOutput(comments))
    })

    app.post('/api/get/comments', async (req, res) => {
        let comments = await db.getUserComments(req.body.uid)
        res.send(formatCommentsOutput(comments))
    })

    app.post('/api/add/comments', async (req, res) => {
        let comments = await db.addComments(req.body.uid, req.body.payload)
        res.send(formatCommentsOutput(comments))
    })

    // meta Data
    // app.get('/api/meta/:id', (req, res) => {
    //     const ids = req.params.id
    //     const urlapi = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${ids}`
    //     const header = { 'X-CMC_PRO_API_KEY': process.env.COINAPI }
    //     axios.get(urlapi, { headers: header }).then(response => {
    //         res.send(response.data)
    //     }).catch(err => console.error(err.response.data.status.error_message))
    // })
}

function formatWalletOutput(input) {
    const { coins, rest, dailyPL } = input[0]
    return {
        coins: JSON.parse(coins),
        rest: JSON.parse(rest),
        dailyPL: JSON.parse(dailyPL)
    }
}

function formatTradeOutput(input) {
    const body = input.map((data) => {
        return {
            date: data.date,
            action: JSON.parse(data.action)
        }
    })
    return { body }
}

function formatCommentsOutput(input) {
    const body = input.map((data) => {
        return {
            date: data.date,
            context: data.context,
            tag: data.tag
        }
    })
    return { body }
}

function allCommentsOutput(input) {
    const body = input.map((data) => {
        return {
            date: data.date,
            context: data.context,
            tag: data.tag
        }
    })
    return { body }
}
// wallet
// "uid" : "test1"
// "payload" : {
//         "coins" : {
//             "bitcoin" : 100,
//             "eth" : 75
//         },
//         "rest" : 2000,
//         "dailyPL" : null
//     }

// "uid" : "test1"
// trade_history
// "payload" : {
//         "action" : {
//             "bitcoin" : ["buy", 20, 4082]
//         }
//     }

// "uid" : "test1"
// comments
// "payload" : {
//         "context" : "almost finished",
//         "tag" : "bitcoin"
//     }