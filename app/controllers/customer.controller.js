const Customer = require('../models/Customer')


function customersList(req, res) {
    Customer.find().lean().exec(function (err, customers) {
        if (err) {
            res.send(err)
        } else {
            res.render('tabela', {
                customers,
                helpers: {
                    inc: function (value) {
                        return parseInt(value) + 1
                    }
                }
            })
        }
    })
}


function customerAdd(cb, data, req, res) {

    let newCustomer = new Customer(data)
    newCustomer.save(req.body, function (err, customers) {
        console.log(req.body)
        if (err) {
            cb(err)
        }
        else {
            cb(null, customers)
            res.render('tabela', { customers })

        }
    })

    res.redirect('/addcustom')
}


function customerDelete(id, cb, req, res) {
    console.log(req.params.id)
    const customerId = req.params.id
    Customer.deleteOne(customerId, { _id: id }, function (err, customer) {
        if (err) {
            cb(err)
        } else {
            cb(null, customer)
        }
    })
    
    res.redirect('/addcustom')
}


module.exports = {
    customersList: customersList,
    customerAdd: customerAdd,
    customerDel: customerDelete
}