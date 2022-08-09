const express = require('express')
const router = express.Router()
const eventController = require('../controllers/event.controller')
const userController = require('../controllers/user.controller')

router.get('/customer/:id/event/new', userController.isLoggedIn, eventController.eventNew)

router.post('/customer/:id/event/add', userController.isLoggedIn, eventController.eventAdd)

router.post('/customer/:id/event/delete/:eventId', userController.isLoggedIn, eventController.eventDelete)


module.exports = router
