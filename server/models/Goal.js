const { Schema, model } = require('mongoose');
// const dateFormat = require('../utils/dateFormat')

const goalSchema = new Schema({
    journeyId: {
        type: Schema.Types.ObjectId,
        ref: 'Journey'
    },
    goalName: {
      type: String,
      required: 'Your journey must have a title.',
      minlength: 1,
      maxlength: 70
    },
    conpletedby: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
    // createdAt: {
    //   type: String,
    //   default: Date.now,
    //   get: timestamp => dateFormat(timestamp)
    // }
})

const Goal = model('Goal', goalSchema);

module.exports = Goal;