const { Journey, Goal } = require('../../models');
const { AuthenticationError } = require('apollo-server-express');

module.exports = {
  Query: {
    helloJ: () => 'Hello World from journeys',
    getJourneys: async () => {
      return await Journey.find()
        .populate('goals')
        .populate('members');
    },
    getJourney: async (_, { journeyId }) => {
      return await Journey.findById(journeyId)
        .populate('goals')
        .populate('members');
    }
  },
  Mutation: {
    // createJourney: async (parent, args, context) => {
    //   if (context.user) {
    //     const journey = await Journey.create({ ...args, creatorId: context.user._id });

    //     await User.findByIdAndUpdate(
    //       { _id: context.user._id },
    //       { $push: { journeys: journey._id } },
    //       { new: true }
    //     ).populate('journeys');

    //     return journey;
    //   }

    //   throw new AuthenticationError('You need to be logged in!');
    // },
    // need to create error handling for deletion of users that don't exist
    deleteJourney: async (_, { id }) => {
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
    },
    addMember: async (parent, { memberId, journeyId }, context) => {
      if (context.user) {
        // const medium = await Media.create({ ...args, userId: context.user._id });

        const updatedJourney = await Journey.findByIdAndUpdate(
          { _id: journeyId },
          { $addToSet: { members: memberId } },
          { new: true }
        ).populate('members');

        return updatedJourney;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    // dropMember: async (parent, args, context) => {
    //   if (context.user) {
    //     const medium = await Media.create({ ...args, userId: context.user._id });

    //     await User.findByIdAndUpdate(
    //       { _id: context.user._id },
    //       { $push: { media: medium._id } },
    //       { new: true }
    //     ).populate('members');

    //     return medium;
    //   }

    //   throw new AuthenticationError('You need to be logged in!');
    // },
    addGoal: async (parent, args, context) => {
      if (context.user) {
        // const medium = await Media.create({ ...args, userId: context.user._id });

        const goal = await Goal.create(args);

        const updatedJourney = await Journey.findByIdAndUpdate(
          { _id: args.journeyId },
          { $push: { goals: goal } },
          { new: true }
        ).populate('goals');

        return updatedJourney;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
  }
};