const { Schema, model } = require('mongoose');

const mediaSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    mediaName: {
      type: String,
      required: 'Your media must have a title.',
      minlength: 1,
    },
    mediaInfo: {
      type: String,
      required: 'You need to provide the purpose of your media.',
      minlength: 1,
    },
    mediaRef: {
      type: String,
      required: 'Your media must have a title.',
      minlength: 1,
    },
    mediaType: {
      type: String,
      required: 'You need to provide the purpose of your media.',
      minlength: 1,
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
)

const Media = model('Media', mediaSchema);

module.exports = Media;