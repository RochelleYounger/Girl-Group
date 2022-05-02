const userResolvers = require('./user');
const journeyResolvers = require('./journey');
const goalResolvers = require('./goal');
const mediaResolvers = require('./media');

module.exports = {
    Query: {
        ...userResolvers.Query,
        ...journeyResolvers.Query,
        ...goalResolvers.Query,
        ...mediaResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...journeyResolvers.Mutation,
        ...goalResolvers.Mutation,
        ...mediaResolvers.Mutation
    },
};