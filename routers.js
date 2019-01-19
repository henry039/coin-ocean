const fetchDB = require('./model/fetchDB')
const db = new fetchDB()
require('dotenv').config();
const axios = require('axios')

module.exports = (app) => {
    app.get('/api/history/:coin', async (req, res) => {
        let coinHistory = await db.getCoinHistory(req.params.coin)
        res.send(coinHistory)
    })
    app.get('/api/realtime/:coin', async(req,res)=>{
        // let coinRealtime = await db.getCoinMinute(req.params.coin)
        let minuteCoin = await db.getRealTimeCoin().minute()
        let hourCoin = await db.getRealTimeCoin().hour()
        res.send({minuteCoin, hourCoin})
    })
    app.get('/api/meta/:id', (req, res) => {
        const ids = req.params.id
        const urlapi = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${ids}`
        const header = { 'X-CMC_PRO_API_KEY': process.env.COINAPI }
        axios.get(urlapi, { headers: header }).then(response => {
            res.send(response.data)
        }).catch(err => console.error(err.response.data.status.error_message))
    })
}
