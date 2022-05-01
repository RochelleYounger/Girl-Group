const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Must match an email address!']
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    token: {
      type: String,
    }
})

const User = model('User', userSchema);

module.exports = User;