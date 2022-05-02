const { Schema, model } = require('mongoose');
// const dateFormat = require('../utils/dateFormat')

const journeySchema = new Schema(
  {
    creatorId: {
      type: String,
      required: true
    },
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
    goals: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Goal'
      }
    ],
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    createdAt: {
      type: String,
      default: Date.now,
      //   get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
)

const Journey = model('Journey', journeySchema);

module.exports = Journey;