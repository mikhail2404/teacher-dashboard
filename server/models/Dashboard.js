//import mongoose to create mongoose model
const mongoose = require('mongoose');

//create Schema
const DashboardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  change: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
})

//export this Schema
module.exports = mongoose.model('dashboard', DashboardSchema);

