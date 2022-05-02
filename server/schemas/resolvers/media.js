const { Media } = require('../../models');

module.exports = {
  Query: {
    helloM: () => 'Hello World from media',
  //   getMedia: async () => {
  //     return await Media.find()
  //   },
  //   getMedium: async (_, {mediaId}) => {
  //     return await Media.findById(mediaId)
  //   }
  },
  Mutation: {
    deleteMedia: async (_, {id}) => {
      await Media.findByIdAndDelete(id);
      return 'medium deleted';
    },
  }
};

















    // createMedia: async (_, {mediaName, mediaInfo, mediaRef, mediaType}) => {

    //   // build mongoose jedia model
    //   const media = new Media ({
    //     mediaName: mediaName,
    //     mediaInfo: mediaInfo,
    //     mediaRef: mediaRef,
    //     mediaType: mediaType
    //   })
    
    //   // save media to db
    //   await media.save();
    //   return media;
    // },
    // updateMedia: async (_, { id, mediaName, mediaInfo, mediaRef, mediaType }) => {
    //   const media = await Media.findByIdAndUpdate( 
    //     id,
    //     { mediaName, mediaInfo, mediaRef, mediaType },
    //     { new: true }
    //   );
    //   return media
    // }