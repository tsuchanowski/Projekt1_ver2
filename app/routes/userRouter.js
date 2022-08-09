const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

router.get('/', userController.redirect) 

router.get('/signup/new-user', userController.newUser)

router.get('/logout', userController.logout)

router.get('/login', userController.isLoggedOut, userController.login)

router.post('/signup/add',  userController.add) 
  
router.post('/login/process', userController.loginProcess)


module.exports = router
