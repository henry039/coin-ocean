const fetchDB = require('./model/fetchDB')
const db = new fetchDB()

module.exports = (app) => {
    // User
    app.post('/api/add/user', async(req, res)=>{
        let addUserProfile = await db.createUserProfile(req.body.uid, req.body.payload)
        res.send(addUserProfile[0])
    })

    app.post('/api/get/subscribe', async(req, res)=>{
        let subscribe = await db.getSubscribeCoin(req.body.uid)
        res.send(subscribe[0].subscribe)
    })

    app.post('/api/update/subscribe', async(req, res)=>{
        let subscribe = await db.updateSubscribeCoin(req.body.uid, req.body.coinList)
        res.send(subscribe[0].subscribe)
    })

    app.post('/api/get/reminder', async(req, res)=>{
        let reminder = await db.getReminder(req.body.uid)
        res.send(reminder[0].reminder)
    })

    app.post('/api/update/reminder', async(req, res)=> {
        let reminder = await db.updateReminder(req.body.uid, req.body.reminder)
        res.send(reminder[0].reminder)
    })

    // Wallet
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
        res.send(formatCommentsOutput(comments))
    })

    app.post('/api/get/comments', async (req, res) => {
        let comments = await db.getUserComments(req.body.uid)
        res.send(formatCommentsOutput(comments))
    })

    app.post('/api/add/comments', async (req, res) => {
        let comments = await db.addComments(req.body.uid, req.body.payload)
        res.send(formatCommentsOutput(comments))
    })
}

function formatWalletOutput(input) {
    const { coins, rest, dailyPL } = input[0]
    return {
        coins: ((coins === null) ? ([]) : (JSON.parse(coins))),
        rest: JSON.parse(rest),
        dailyPL: ((dailyPL === null) ? ([]) : (JSON.parse(dailyPL)))
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
            tag: data.tag,
            displayname : data.displayName,
            photourl : data.photoURL
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