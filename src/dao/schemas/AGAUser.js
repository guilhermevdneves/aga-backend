const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

const { Schema } = mongoose;

const UserSchema = new Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
    alias: 'id',
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  number: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  },
});

module.exports = mongoose.model('AGAUser', UserSchema);
