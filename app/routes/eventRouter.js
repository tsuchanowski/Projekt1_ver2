const express = require('express')
const router = express.Router()
const eventController = require('../controllers/event.controller')
const userController = require('../controllers/user.controller')


router.get('/customer_site/:id/new_event', userController.isLoggedIn, eventController.newEvent)

router.post('/customer_site/:id/add_event', userController.isLoggedIn, eventController.addEvent)

router.post('/customer_site/:id', userController.isLoggedIn, eventController.delEvent)


module.exports = router
