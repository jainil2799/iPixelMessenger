const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)
let users = {}
io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('new-user', name => {
        users[socket.id] = name;
        io.emit('user-connected', { name: users[socket.id], users: users });

    });
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
      socket.on ('color', color=>{
          socket.broadcast.emit('themecolor', color)
      })
      socket.on('disconnect', () => {
        if (users[socket.id]) {
            socket.broadcast.emit('user-disconnected', { name: users[socket.id], users: users, id: socket.id });

            //deleteing the record from server
            delete users[socket.id];
        }

    });
})