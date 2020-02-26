const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets.js')

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  console.log(req.decodedJWT)

  if(req.decodedJWT){
    next()
  }else if(token){
    jwt.verify(token, secrets.jwtSecret, (err, decodedJWT) => {
      if(err){
        res.status(404).json({ you: 'shall not pass!' });
      }else{
        req.decoded = decodedJWT
        next()
      }
    })
  }else{
    res.status(401).json({ you: "can't touch that." });
  }


};
