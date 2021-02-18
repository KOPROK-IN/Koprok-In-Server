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
				err.from = 'Controller - Register User'
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
				err.from = 'Controller - Login User'
				next(err)
			})
	}
	
	static updateMoney(req,res,next){
		const { gamblingMoney } = req.body

		console.log(gamblingMoney)

		User.findOne({
			where:{
				id: req.user.id
			}
		})
			.then( userData => {

				if(!userData) throw { name: 'Custom', message: 'Error Not Found', status: 404 }

				let moneyNow = userData.dataValues.money + Number(gamblingMoney)

				return User.update({ money: moneyNow },{ 
						where:{
							id: userData.dataValues.id
					},returning: true
				})
			})
			.then( userUpdate => {
				res.status(200).json({
					id: userUpdate[1][0].dataValues.id,
					name: userUpdate[1][0].dataValues.email,
					money: userUpdate[1][0].dataValues.money
				})
			})
			.catch( err => {
				err.from = 'Controller - Edit Money User'
      	next(err)
			})
	}
}

module.exports = Controller