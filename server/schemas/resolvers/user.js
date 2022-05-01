const { User } = require('../../models');
const { ApolloError } = require('apollo-server-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  Query: {
    hello: () => 'Hello World',
    getUsers: async () => {
      return await User.find();
    },
    getUser: async (_, {userId}) => {
      return await User.findById(userId);
    }
  },
  Mutation: {
    createUser: async (_, {username, email, password}) => {
      // **NOTE** following code now irrelevant due to previous object destructuring
      // const { username, email, password } = args.user;
      // const user = new User({ username, email, password });
      // await user.save();
      // return user;

      // check if user already exist
      const existingUser = await User.findOne({ email });
      // throw error for existing users
      if (existingUser) {
        throw new ApolloError('The email ' + email + ' already belongs to a user.', 'USER_ALREADY_EXISTS');
      }

      // encrypt password
      var encryptedPW = await bcrypt.hash(password, 10);

      // build mongoose model
      const user = new User({
        username: username,
        email: email.toLowerCase(),
        password: encryptedPW
      })

      // create JWT (attach to user) **NOTE** This needs to be hidden later on
      const token = jwt.sign(
        { user_id: user._id, email },
        'UNSAFE_STRING',
        {
          expiresIn: '24h'
        }
      );

      user.token = token;

      // save user to db
      await user.save();
      return user;
    },
    loginUser: async (_, args) => {
      const { email, password } = args.user;
      // check if user exist
      const user = await User.findOne({ email });

      // check if pw matches encrypted pw
      if (user && (await bcrypt.compare(password, user.password))) {
        // create token
        const token = jwt.sign(
          { user_id: user._id, email },
          'UNSAFE_STRING',
          {
            expiresIn: '24h'
          }
        );
        // attach token to user
        user.token = token;
        return user;
      } else {
        // if user doesn't exist throw error
        throw new ApolloError('Incorrect credentials. Make sure your credentials are properly formatted', 'INCORRECT_PASSWORD')
      } 
    },
    // need to create error handling for deletion of users that don't exist
    deleteUser: async (_, {id}) => {
      await User.findByIdAndDelete(id);
      return 'user deleted';
    },
    updateUser: async (_, { id, username, email, password }) => {
      // const { id } = args;
      // const { username, email } = args.user;
      const user = await User.findByIdAndUpdate( 
        id,
        { username, email, password },
        { new: true }
      );
      return user
    }
  }
};