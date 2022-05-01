const userResolvers = require('./user');
const journeyResolvers = require('./journey');

module.exports = {
    Query: {
        ...userResolvers.Query,
        ...journeyResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...journeyResolvers.Mutation
    },
};