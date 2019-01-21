const fetchDB = require('./model/fetchDB')
const db = new fetchDB()
const axios = require('axios')

module.exports = (app) => {
    app.get('/api/history/:coin', async (req, res) => {
        let coinHistory = await db.getCoinHistory(req.params.coin)
        res.send(coinHistory)
    })
    app.get('/api/realtime/:coin', async(req,res)=>{
        // let coinRealtime = await db.getCoinMinute(req.params.coin)
        let realTimeData = await db.getRealTimeCoin()()
        res.send(realTimeData)
    })

    // Wallet
    app.post('/api/create/wallet', async(req,res)=>{
        let newWallet = await db.createWallet(req.data.uid, req.data.payload)
        res.send(newWallet)
    })

    app.post('/api/get/wallet', async(req, res)=>{
        let walletDetail = await db.getWallet(req.data.uid)
        res.send(walletDetail)
    })

    app.post('/api/update/wallet', (req, res)=>{
        if(req.data.payload.dailyPL){
            db.dailyUpdateWallet(req.data.uid, req.data.payload)
        }else{
            db.updateWallet(req.data.uid, req.data.payload)
        }
    })

    // trade-history
    app.post('/api/get/trade-history', async(req,res)=>{
        let history = await db.getTradeHistory(req.data.uid)
        res.send(history)
    })

    app.post('/api/add/trade-history', async(req,res)=>{
        let history = await db.insertTradeHistory(req.data.uid, req.data.payload)
        res.send(history)
    })

    // Comment
    app.get('/api/allComments/:coin', async(req, res)=>{
        let comments = await db.getAllComments(req.params.coin)
        res.send(comments)
    })

    app.post('/api/get/comments', async(req, res)=>{
        let comments = await db.getUserComments(req.data.uid, req.data.payload)
        res.send(comments)
    })

    app.post('/api/add/comments', async(req, res)=>{
        db.addComments(req.data.uid, req.data.payload)
    })

    // meta Data
    app.get('/api/meta/:id', (req, res) => {
        const ids = req.params.id
        const urlapi = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${ids}`
        const header = { 'X-CMC_PRO_API_KEY': process.env.COINAPI }
        axios.get(urlapi, { headers: header }).then(response => {
            res.send(response.data)
        }).catch(err => console.error(err.response.data.status.error_message))
    })
}
