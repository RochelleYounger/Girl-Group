const { User } = require('../models');

const resolvers = {
  Query: {
    hello: () => {
      return 'Hello World';
    },
    getAllUsers: async () => {
      return await User.find();
    },
    getUser: async (_, {id}) => {
      return await User.findById(id);
    }
  },
  Mutation: {
    createUser: async (_, args) => {
      const { username, email, password } = args.user;
      const user = new User({ username, email, password });
      await user.save();
      return user;
    },
    deleteUser: async (_, {id}) => {
      await User.findByIdAndDelete(id);
      return 'user deleted';
    },
    updateUser: async (_, args) => {
      const { id } = args;
      const { username, email, password } = args.user;
      const user = await User.findByIdAndUpdate(
        id,
        { username, email, password },
        { new: true }
      );
      return user
    }
  }
};

module.exports = resolvers;