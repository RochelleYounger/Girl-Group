const { Schema, model } = require('mongoose');
// const dateFormat = require('../utils/dateFormat')

const journeySchema = new Schema({
    // username: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   trim: true
    // },
    title: {
      type: String,
      required: 'Your journey must have a title.',
      minlength: 1,
      maxlength: 35
    },
    purpose: {
      type: String,
      required: 'You need to provide the purpose of your Journey.',
      minlength: 1,
      maxlength: 350
    },
    // createdAt: {
    //   type: String,
    //   default: Date.now,
    //   get: timestamp => dateFormat(timestamp)
    // }
})

const Journey = model('Journey', journeySchema);

module.exports = Journey;