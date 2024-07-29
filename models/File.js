const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
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
  status: {
    type: String,
    enum: ['Pending', 'Approved'],
    default: 'Pending',
  },
});

module.exports = mongoose.model('File', FileSchema);
