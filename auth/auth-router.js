const router = require('express').Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Users = require('./auth-model.js')
const secrets = require('../config/secrets.js')
const restricted = require('./authenticate-middleware.js')

router.post('/register', (req, res) => {
    let newUser = req.body
    const hash = bcrypt.hashSync(newUser.password, 8)
    newUser.password = hash
    Users.add(newUser)
      .then(saved => {
        const token = generateToken(saved)
        res.status(201).json({message: `Welcome back ${saved.username}`, token})
      })
      .catch(err => {
        res.status(500).json({errorMessage: `There was an error with your registration`})
      })
});

router.post('/login', (req, res) => {
    const { username, password } = req.body

    Users.findBy({username})
      .then(user => {
        if(user && bcrypt.compareSync(password, user.password)){
          const token = generateToken(user)
          res.status(200).json({message: `Welcome back, ${user.username}`, token})
        }else{ 
          res.status(401).json({errorMessage: `Invalid credentials`})
        }
      })
      .catch(err => {
        res.status(500).json({err: `There was an error with your ${req.method} request`})
      })
});

function generateToken(user){
  const payload = {
    subject: user.id,
    username: user.username
  }

  const options = {
    expiresIn: '1h'
  }

  return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;
