if(process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test'){
  require('dotenv').config()
}

const express = require('express')
const route = require('./routes/index')
const app = express()
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', route)
app.use(errorHandler)

app.listen(port, () => {
  console.log('app is running on port :', port)
})