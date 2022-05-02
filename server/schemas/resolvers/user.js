const { User, Media, Journey } = require('../../models');
const { AuthenticationError } = require('apollo-server-express');
const { ApolloError } = require('apollo-server-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { signToken } = require('../../utils/auth');

module.exports = {
  // Query: {
  //   hello: () => 'Hello World',
  //   client: async (_, __, context) => {
  //     if (context.user) {
  //       const userData = await User.findOne({ _id: context.user._id })
  //         // .select('-__v -password')
  //         .populate('journeys')
  //         .populate('media');

  //       return userData;
  //     }

  //     // throw new AuthenticationError('Not logged in');
  //   },
  //   getUsers: async () => {
  //     return await User.find();
  //   },
  //   getUser: async (_, {userId}) => {
  //     return await User.findById(userId);
  //   }
  // },
  // Mutation: {
  //   createUser: async (_, {username, email, password}) => {
  //     // **NOTE** following code now irrelevant due to previous object destructuring
  //     // const { username, email, password } = args.user;
  //     // const user = new User({ username, email, password });
  //     // await user.save();
  //     // return user;

  //     // check if user already exist
  //     // const existingUser = await User.findOne({ email });
  //     // // throw error for existing users
  //     // if (existingUser) {
  //     //   throw new ApolloError('The email ' + email + ' already belongs to a user.', 'USER_ALREADY_EXISTS');
  //     // }

  //     // encrypt password
  //     // var encryptedPW = await bcrypt.hash(password, 10);

  //     // build mongoose model
  //     const user = new User({
  //       username: username,
  //       email: email.toLowerCase(),
  //       password: password
  //     })

  //     // create JWT (attach to user) **NOTE** This needs to be hidden later on
  //     const token = jwt.sign(
  //       { user_id: user._id, email },
  //       'UNSAFE_STRING',
  //       {
  //         expiresIn: '24h'
  //       }
  //     );

  //     user.token = token;

  //     // save user to db
  //     await user.save();
  //     return user;
  //   },
  //   loginUser: async (_, {email, password}) => {
  //     // const { email, password } = args.user;
  //     // check if user exist
  //     const user = await User.findOne({ email });

  //     // check if pw matches encrypted pw
  //     if (user && (await bcrypt.compare(password, user.password))) {
  //       // create token
  //       const token = jwt.sign(
  //         { user_id: user._id, email },
  //         'UNSAFE_STRING',
  //         {
  //           expiresIn: '24h'
  //         }
  //       );
  //       // attach token to user
  //       user.token = token;
  //       return user;
  //     } else {
  //       // if user doesn't exist throw error
  //       throw new ApolloError('Incorrect credentials. Make sure your credentials are properly formatted', 'INCORRECT_PASSWORD')
  //     } 
  //   },
  //   // need to create error handling for deletion of users that don't exist
  //   deleteUser: async (_, {id}) => {
  //     await User.findByIdAndDelete(id);
  //     return 'user deleted';
  //   },
  //   updateUser: async (_, { id, username, email, password, bio }) => {
  //     // const { id } = args;
  //     // const { username, email } = args.user;
  //     const user = await User.findByIdAndUpdate( 
  //       id,
  //       { username, email, password, bio },
  //       { new: true }
  //     );
  //     return user
  //   }
  // }

  Query: {
    hello: () => 'Hello World',
    client: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          // .select('-__v -password')
          .populate('media')
          .populate('journeys')
          // .populate('friends');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    getUsers: async () => {
      return User.find()
        // .select('-__v -password')
        .populate('media')
        .populate('journeys')
        // .populate('friends');
    },
    getUser: async (parent, { username }) => {
      return User.findOne({ username })
        // .select('-__v -password')
        // .populate('friends')
        // .populate('thoughts');
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
      // const { id } = args;
      // const { username, email } = args.user;
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
    // *****NOTE don't really need this code because we have the deleteMedia resolver in media resolvers
    // removeMedia: async (parent, args, context) => {
    //   if (context.user) {
    //     const medium = await Media.create({ ...args, userId: context.user._id });

    //     await User.findByIdAndUpdate(
    //       { _id: context.user._id },
    //       { $push: { media: medium._id } },
    //       { new: true }
    //     );

    //     return medium;
    //   }

    //   throw new AuthenticationError('You need to be logged in!');
    // },
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