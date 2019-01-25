const webSocket = require('socket.io');

module.exports = (server) => {
    let io =  webSocket(server);

    io.on('connection', (socket)=>{
        socket.on('need chart data', (msg)=>{
            console.log(msg)
            socket.emit('reply', `send from server ${Math.random() * 100}`)
        })
    })
}