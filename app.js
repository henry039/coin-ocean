const express = require('express')
const router = require('./routers')
const parser = require('body-parser')
const cors = require('cors')

let app = express()
app.listen(5000)

app.use(cors({
    origin: [ 'http://localhost:3000'], 
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
app.use(parser.urlencoded({extend: false}))
app.use(parser.json())
router(app)