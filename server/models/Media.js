const { Schema, model } = require('mongoose');
// const dateFormat = require('../utils/dateFormat')

const mediaSchema = new Schema({
    // username: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   trim: true
    // },
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
    },
    // createdAt: {
    //   type: String,
    //   default: Date.now,
    //   get: timestamp => dateFormat(timestamp)
    // }
})

const Media = model('Media', mediaSchema);

module.exports = Media;