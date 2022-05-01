const { Journey } = require('../../models');
// not used for now
// const { ApolloError } = require('apollo-server-errors');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

module.exports = {
  Query: {
    helloJ: () => 'Hello World from journeys',
    getJourneys: async () => {
      return await Journey.find();
    },
    getJourney: async (_, {journeyId}) => {
      return await Journey.findById(journeyId);
    }
  },
  Mutation: {
    createJourney: async (_, {title, purpose}) => {

      // build mongoose journey model
      const journey = new Journey ({
        title: title,
        purpose: purpose
      })


      // save journey to db
      await journey.save();
      return journey;
    },
    // need to create error handling for deletion of users that don't exist
    deleteJourney: async (_, {id}) => {
      await Journey.findByIdAndDelete(id);
      return 'journey deleted';
    },
    updateJourney: async (_, { id, title, purpose }) => {
      const journey = await Journey.findByIdAndUpdate( 
        id,
        { title, purpose },
        { new: true }
      );
      return journey
    }
  }
};