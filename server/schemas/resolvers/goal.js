const { Goal } = require('../../models');

module.exports = {
  Query: {
    helloG: () => 'Hello World from goals',
    // getGoals: async () => {
    //   return await Goal.find();
    // },
    // getGoal: async (_, {goalId}) => {
    //   return await Goal.findById(goalId);
    // }
  },
  Mutation: {
    // need to create error handling for deletion of users that don't exist
    deleteGoal: async (_, {id}) => {
      await Goal.findByIdAndDelete(id);
      return 'goal deleted';
    },
  }
};















    // createGoal: async (_, {goalName}) => {

    //   // build mongoose goal model
    //   const goal = new Goal ({
    //     goalName: goalName
    //   })


    //   // save goal to db
    //   await goal.save();
    //   return goal;
    // },
  //   updateGoal: async (_, { id, goalName }) => {
  //     const goal = await Goal.findByIdAndUpdate( 
  //       id,
  //       { goalName },
  //       { new: true }
  //     );
  //     return goal
  //   }