if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require('express')
const route = require('./routes/index')
const app = express()
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')
const port = process.env.PORT || 3000
const http = require('http').Server(app)
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    credentials: true
  },
  allowEIO3: true
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', route)
app.use(errorHandler)

const allClients = [];
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('login', (player) => {
    console.log('user login');
    console.log(player)
    var index = allClients.indexOf(player);
    if (index === -1) {
      allClients.splice(index, 1);
    }
    allClients.push(player);
    console.log(allClients, 'setelah pushhhhh');

    if(allClients[0] === player && allClients.length) {
      const random = Math.floor(Math.random() * 6) + 1;
      io.emit('rollDice', random)

      function starter() {
        const random = Math.floor(Math.random() * 6) + 1;
        setTimeout(() => {
          io.emit('rollDice', random)
          return starter()
        }, 5000)
      }
      starter()
    }
    io.emit('listPlayers', allClients);
    
  })
  socket.on('logout', function (client) {
    console.log('logged out!');
    console.log(client);
    
    var i = allClients.indexOf(client);
    allClients.splice(i, 1);
    console.log(allClients, 'setelah spliceeeeeeee');
    io.emit('listPlayers', allClients);
  });
});

http.listen(port, () => {
  console.log('app is running on port :', port)
})