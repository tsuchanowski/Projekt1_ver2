const Customer = require('../models/Customer')
const Event = require('../models/Event')

// function postList(cb) {
//   Customer.find()
//     .lean()
//     .exec(function (err, customer) {
//       if (err) {
//         cb(err)
//       } else {
//         cb(null, customer)
//       }
//     })
// }

// function postDelete(id, cb) {
//   Customer.deleteOne({ _id: id }, function (err, customer) {
//     if (err) {
//       cb(err)
//     } else {
//       cb(null, customer)
//     }
//   })
// }

function postShowCustomer(id, cb) {
  Customer.findOne({ _id: id }, function (err, customer) {
    if (err) {
      cb(err)
    } else {
      cb(null, customer)
    }
  })
}

// function eventAdd(data, cb) {
//   let newCustomer = new Customer(data)
//   newCustomer.save(function (err, customer) {
//     if (err) {
//       cb(err)
//     } else {
//       cb(null, customer)
//     }
//   })
// }


function newEvent(req, res) {
  res.render('add_actions', { id: req.params.id })
}

function addEvent(req, res) {
  console.log(req.body)
  const customerId = req.params.id

  // customer.updateOne(function(err) {

  // that's it!

  //   Customer.findOne({ _id: customerId }, function (err, customer) {
  //     if (err) return handleError(err)

  const event = new Event({
    customer: customerId,
    ...req.body
  })
  event.save(function (err) {
    if (err) return handleError(err)
  })

  console.log(event._id)

//   Customer.updateOne({ _id: customerId }, { $push: { event: event._id } })

  Customer.findOne({ _id: customerId }, function(err, customer) {
    console.log(customer)
    // customer.populate('events')
    customer.events.push(event)
    customer.save()
  })
//   console.log(customer)

//   customer.populate('event')
  //   .exec(function (err, event) {
  //     if (err) return handleError(err)
  //     console.log(event)
  //     // prints "The author is Ian Fleming"
  //   })
  // })

  // })

res.redirect('/customer_site/' + customerId)
}

function eventDelete(req, res) {
  console.log(req.params.id)
  const customerId = req.params.id
  const event = new Event({
    customer: customerId,
    ...req.params.id
  })
  event.deleteOne({_id: customerId}, function (err) {
    if (err) return handleError(err)
  })

  // Customer.findOne({ _id: customerId }, function(err, customer) {
  //   console.log(customer)
    
  //   // customer.events.remove(event)
  //   // customer.events.delete()
  // })
    res.redirect('/customer_site/' + customerId)
}
  

module.exports = {
  // list: postList,
  // add: eventAdd,
  // delete: postDelete,
  showCustomer: postShowCustomer,
  newEvent: newEvent,
  addEvent: addEvent,
  delEvent: eventDelete
}
