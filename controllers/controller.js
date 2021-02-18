const { User } = require('../models/index')
const { comparePassword} = require('../helpers/bcrypt')
const { generateToken} = require('../helpers/jwt')

class Controller{

  static register(req, res, next){
    const {email , password} = req.body

    let newUser = {
        email,
        password
    }
    
		User.create(newUser)
			.then( user => {
				res.status(201).json({
					message: 'Register Success',
          id: user.id,
          name: user.name,
          email: user.email,
          money: user.money
				})
			})
			.catch( err => {
				err.from = 'UserController - Register User'
				next(err)
			})
  }

  static login(req, res, next){
    const {email , password} = req.body

			User.findOne({
				where:{
					email
				}
			})
			.then( user => {

				if(!user) throw { name: 'Custom', message: 'Invalid Email or Password', status: 400 }
				const comparedPass = comparePassword(password, user.password)
				if(!comparedPass) throw { name: 'Custom', message: 'Invalid Email or Password', status: 400 }

				let token = generateToken({
					id: user.id,
          name: user.name,
          email: user.email,
          money: user.money
				})

				res.status(200).json({ access_token: token })

			})
			.catch( err => {
				err.from = 'UserController - Login User'
				next(err)
			})
  }

}

module.exports = Controller