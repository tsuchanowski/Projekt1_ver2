const Customer = require('../models/Customer')
const Event = require('../models/Event')

function newEvent(req, res) {
  res.render('add_actions', { id: req.params.id })
}

function addEvent(req, res) {
  console.log(req.body)
  const customerId = req.params.id
  
  const event = new Event({
    customer: customerId,
    ...req.body
  })
  event.save(function (err) {
    if (err) return handleError(err)
  })

  console.log(event._id)

  Customer.findOne({ _id: customerId }, function (err, customer) {
    console.log(customer)
    customer.populate('events')
    customer.events.push(event)
    customer.save()
  })
  res.redirect('/customer_site/' + customerId)
}

function eventDelete(req, res) {
  const customerId = req.params.id

  const event = Event({
    customer: customerId,
    ...req.params.id
  })

  event.deleteOne({ _id: customerId }, function (err, customer) {
    if (err) handleError(err)

    // Customer.findOne({ _id: customerId }, function (err, customer) {
    //   console.log(customer)
    //   // customer.populate('events')
    //   customer.events.deleteOne(event)
    //   customer.delete()
    // })
    
res.redirect('/customer_site/:id')
})
}

module.exports = {
  newEvent: newEvent,
  addEvent: addEvent,
  delEvent: eventDelete
}
