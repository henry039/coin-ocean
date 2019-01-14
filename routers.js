const fetchDB = require('./model/fetchDB')

const db = new fetchDB()
require('dotenv').config();
const axios = require('axios')

module.exports = (app) => {
    app.get('/api/bitcoin', async (req, res) => {
        let bitcoin = await db.getBitcoin()
        res.send(bitcoin)
    })
    app.get('/api/meta', (req, res) => {
        const urlapi = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=1,2,10'
        const header = { 'X-CMC_PRO_API_KEY': process.env.COINAPI }
        axios.get(urlapi, { headers: header }).then(response => {
            res.send(response.data)
        }).catch(err => console.error(err.response.data.status.error_message))
    })
}
