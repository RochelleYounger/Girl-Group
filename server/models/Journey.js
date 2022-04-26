const { Schema, model } = require('mongoose');
const goalSchema = require('./Goal');
const dateFormat = require('../utils/dateFormat');

const journeySchema = new Schema(
  {
    journeyTitle: {
      type: String,
      required: 'You need to leave a journey!',
      minlength: 1,
      maxlength: 30
    },
    journeyDescription: {
      type: String,
      required: 'You need to leave a journey!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    goals: [goalSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

journeySchema.virtual('goalCount').get(function() {
  return this.goals.length;
});

const Journey = model('Journey', journeySchema);

module.exports = Journey
