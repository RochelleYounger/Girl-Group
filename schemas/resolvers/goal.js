const { Goal } = require('../../models');
// not used for now
// const { ApolloError } = require('apollo-server-errors');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

module.exports = {
  Query: {
    helloG: () => 'Hello World from goals',
    getGoals: async () => {
      return await Goal.find();
    },
    getGoal: async (_, {goalId}) => {
      return await Goal.findById(goalId);
    }
  },
  Mutation: {
    createGoal: async (_, {goalName}) => {

      // build mongoose goal model
      const goal = new Goal ({
        goalName: goalName
      })


      // save goal to db
      await goal.save();
      return goal;
    },
    // need to create error handling for deletion of users that don't exist
    deleteGoal: async (_, {id}) => {
      await Goal.findByIdAndDelete(id);
      return 'goal deleted';
    },
    updateGoal: async (_, { id, goalName }) => {
      const goal = await Goal.findByIdAndUpdate( 
        id,
        { goalName },
        { new: true }
      );
      return goal
    }
  }
};