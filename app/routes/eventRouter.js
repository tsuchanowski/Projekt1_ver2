const express = require('express')
const router = express.Router()
const eventController = require('../controllers/event.controller')
const userController = require('../controllers/user.controller')


router.get('/customer/:id/event/new', userController.isLoggedIn, eventController.newEvent)

router.post('/customer/:id/event/add', userController.isLoggedIn, eventController.addEvent)

router.post('/customer/:id/event/:eventId', userController.isLoggedIn, eventController.delEvent)


module.exports = router
