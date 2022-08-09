const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const customerController = require('../controllers/customer.controller')

router.get('/customer/new', userController.isLoggedIn, customerController.customerNew)

router.post('/customer/add', userController.isLoggedIn, customerController.customerAdd)

router.get('/customer/list', userController.isLoggedIn, customerController.customerList)

router.get('/customer/:id', userController.isLoggedIn, customerController.customerShow)

router.post('/customer/delete/:id', userController.isLoggedIn, customerController.customerDelete)


module.exports = router