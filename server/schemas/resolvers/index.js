const userResolvers = require('./user');
const journeyResolvers = require('./journey');
const goalResolvers = require('./goal')

module.exports = {
    Query: {
        ...userResolvers.Query,
        ...journeyResolvers.Query,
        ...goalResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...journeyResolvers.Mutation,
        ...goalResolvers.Mutation
    },
};