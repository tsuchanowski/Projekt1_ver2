const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const customerController = require('../controllers/customer.controller')

router.get('/customer/new', userController.isLoggedIn, customerController.showForm)

router.post('/customer/add', userController.isLoggedIn, customerController.customerAdd)

router.get('/customer/list', userController.isLoggedIn, customerController.customersList)

router.get('/customer/:id', userController.isLoggedIn, customerController.showCustomer)

router.post('/:id', userController.isLoggedIn, customerController.customerDel)



module.exports = router