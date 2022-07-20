const express = require('express')
const router = express.Router()
const eventController = require('../controllers/event.controller')
const userController = require('../controllers/user.controller')
const customerController = require('../controllers/customer.controller')

// router.post('/formcustom', userController.isLoggedIn, function (req, res) {
//   eventController.add(req.body, function (err) {
//     if (err) {
//       res.send(err)
//     }
//     res.redirect('/addcustom')
//   })
// })

// router.post('/:id', userController.isLoggedIn, function (req, res) {
//   eventController.delete(req.params.id, function (err) {
//     if (err) {
//       res.send(err)
//     }
//     res.redirect('/addcustom')
//   })
// })

router.get('/customer_site/:id', userController.isLoggedIn, function (req, res) {
  eventController.showCustomer({ _id: req.params.id }, function (err, customer) {
    if (err) {
      res.send(err)
    }

    // console.log(customer.events[0].eventdate)
    customer.populate('events')
    // customer.populate('events').exec(function(err, person) {
    //     console.log(person)
    // })
    console.log(customer)

    res.render('tabela_klienta', {
      id: customer._id,
      name: customer.name,
      address: customer.address,
      company: customer.company,
      nipnumber: customer.nipnumber,
      events: customer.events
    })
  })
})

router.get('/customer_site/:id/new_event', userController.isLoggedIn, eventController.newEvent)


router.post('/customer_site/:id/add_event', userController.isLoggedIn, eventController.addEvent)


router.post('/customer_site/:id', userController.isLoggedIn, eventController.delEvent)

module.exports = router
