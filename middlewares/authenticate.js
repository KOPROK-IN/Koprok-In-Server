const {verify} = require('../helpers/jwt')

function authenticate(req,res,next){
  try{
    const token = req.headers.access_token
    const decode = verify(token)

    req.user = decode

    next()
  } catch(err){
    next(err)
  }
}

module.exports = authenticate