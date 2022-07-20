const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const customerController = require('../controllers/customer.controller')

router.get('/addcustom', userController.isLoggedIn, customerController.customersList)
router.get('/formcustom', userController.isLoggedIn, function (req, res) {
  res.render('add_customer')
})


router.post('/formcustom', userController.isLoggedIn, customerController.customerAdd)


router.post('/:id', userController.isLoggedIn, customerController.customerDel)




module.exports = router