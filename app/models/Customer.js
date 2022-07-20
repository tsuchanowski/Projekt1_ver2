const mongoose = require('mongoose')
const Event = require('./Event')

mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const schema = new mongoose.Schema({
  name: { type: String },
  address: { type: String },
  company: { type: String },
  nipnumber: { type: String },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
})

module.exports = mongoose.model('Customer', schema)
