const mongoose = require('mongoose')

mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const schema = new mongoose.Schema({
  eventdate: { type: String },
  action: { type: String },
  description: { type: String },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }
})

module.exports = mongoose.model('Event', schema)
