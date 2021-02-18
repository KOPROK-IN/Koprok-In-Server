if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require('express')
const route = require('./routes/index')
const app = express()
const cors = require('cors')
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

io.on('connection', (socket) => {
  console.log('a user connected');
});

http.listen(port, () => {
  console.log('app is running on port :', port)
})