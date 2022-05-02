const { Schema, model } = require('mongoose');

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
})

const Goal = model('Goal', goalSchema);

module.exports = Goal;