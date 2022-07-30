const Customer = require('../models/Customer')
const Event = require('../models/Event')


function newEvent(req, res) {
  res.render('event/add', { customerId: req.params.id })
}


function addEvent(req, res) {
  const customerId = req.params.id

  const event = new Event({ customer: customerId, ...req.body })

  event.save(function (err) {
    if (err) return handleError(err)
  })

  Customer.findOne({ _id: customerId }, function (err, customer) {
    console.log(customer)
    customer.populate('events')
    customer.events.push(event)
    customer.save()
  })

  res.redirect('/customer/' + customerId)
}


function eventDelete(req, res) {
  const customerId = req.params.id
  const eventId = req.params.eventId

  Event.deleteOne({ _id: eventId }, function (err) {
    if (err) {
      handleError(err)
    }

    console.log('tutaj updatuję customera i usuwam reference_id')
    Customer.updateOne({ _id: customerId }, { $pullAll: { events: [{ _id: eventId }] } }, function (err) {
      if (err) {
        handleError(err)
      }
    })
  })


  res.redirect('/customer/' + customerId)
}

module.exports = {
  newEvent: newEvent,
  addEvent: addEvent,
  delEvent: eventDelete
}
