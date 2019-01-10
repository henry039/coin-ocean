const fetchDB = require('./model/fetchDB')

const db = new fetchDB()

module.exports = (app) =>{
    app.get('/api/bitcoin', async(req, res)=>{
        let bitcoin = await db.getBitcoin()
        res.send(bitcoin)
    })
}