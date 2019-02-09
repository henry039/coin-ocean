const express = require('express')
const router = require('./routers')
const parser = require('body-parser')
const cors = require('cors')
const socketIO = require('./model/ws/websocket')


let app = express()
let server = app.listen(5000)

// react build
// app.use(express.static(__dirname+'/coin-ocean-react/build'))
// app.get('/*', (req, res)=> {
//     res.sendFile(__dirname+'/coin-ocean-react/build/index.html')
// })
app.use(cors({
    origin: [ 'http://localhost:3000'], 
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
// app.use(cors())
app.use(parser.urlencoded({extended: false}))
app.use(parser.json())
router(app)
socketIO(server)