const router = require('express').Router()
const Controller = require('../controllers/controller')
const authenticate = require('../middlewares/authenticate')

router.post('/register', Controller.register)
router.post('/login', Controller.login)

router.use(authenticate)
router.get('/', Controller.getUser)

router.patch('/', Controller.updateMoney)

module.exports = router