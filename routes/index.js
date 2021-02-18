const router = require('express').Router()
const Controller = require('../controllers/controller')
const authenticate = require('../middlewares/authenticate')

router.post('/register', Controller.register)

router.post('/login', Controller.login)

router.use(authenticate)

module.exports = router