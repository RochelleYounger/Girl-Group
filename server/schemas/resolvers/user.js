const { User, Media, Journey } = require('../../models');
const { AuthenticationError } = require('apollo-server-express');
const { ApolloError } = require('apollo-server-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { signToken } = require('../../utils/auth');

module.exports = {
  Query: {
    hello: () => 'Hello World',
    client: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .populate('media')
          .populate('journeys')

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    getUsers: async () => {
      return User.find()
        .populate('media')
        .populate('journeys');
    },
    getUser: async (parent, { username }) => {
      return User.findOne({ username })
      .populate('media')
      .populate('journeys');
    },
  },

  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    deleteUser: async (_, { id }) => {
      await User.findByIdAndDelete(id);
      return 'user deleted';
    },
    updateUser: async (_, { id, username, email, password, bio }) => {
      const user = await User.findByIdAndUpdate(
        id,
        { username, email, password, bio },
        { new: true }
      );
      return user
    },
    addMedia: async (parent, args, context) => {
      if (context.user) {
        const medium = await Media.create({ ...args, userId: context.user._id });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { media: medium._id } },
          { new: true }
        ).populate('media');

        return medium;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addJourney: async (parent, args, context) => {
      if (context.user) {
        const journey = await Journey.create({ ...args, creatorId: context.user._id });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { journeys: journey._id } },
          { new: true }
        ).populate('journeys');

        return journey;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
  }
};