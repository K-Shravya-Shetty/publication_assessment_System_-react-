// models/PcpReport.js
const mongoose = require('mongoose');

const PcpReportSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
  cashAwardGiven: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('PcpReport', PcpReportSchema);
