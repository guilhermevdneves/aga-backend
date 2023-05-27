const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

const { Schema } = mongoose;

const Dates = new Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
    alias: 'id',
  },
  date: {
    type: Date,
    unique: true,
    required: true,
  },
  queue: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model('Dates', Dates);
